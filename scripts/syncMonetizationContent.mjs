import process from "node:process";
import { writeFile } from "node:fs/promises";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { blogSeed } from "../lib/data/blogSeed.js";
import { blogDeepDives } from "../lib/data/blogDeepDives.js";

dotenv.config({ path: process.env.SOURCE_ENV_FILE || ".env", quiet: true });
if (!process.env.DB_URL) throw new Error("DB_URL is required");

const apply = process.argv.includes("--apply");
const backupArg = process.argv.find((arg) => arg.startsWith("--backup="));
const backupPath = backupArg?.slice("--backup=".length);
const client = new MongoClient(process.env.DB_URL, { serverSelectionTimeoutMS: 8000 });
const overview = "Event ticket booking platform with seat selection, verified Stripe payments, and dashboards for customers, theater owners, and admins.";
const oldVideoEditingCover = "https://images.unsplash.com/photo-1536240478704-b2cc80e4d34c?auto=format&fit=crop&w=1600&q=80";

try {
	await client.connect();
	const db = client.db("Nitin_Dev_Space");
	const blogs = db.collection("Blogs");
	const projects = db.collection("Projects");
	const existing = await blogs.find(
		{ slug: { $in: blogSeed.map((post) => post.slug) } },
		{ projection: { slug: 1, content: 1, coverImage: 1, readTime: 1, updatedAt: 1 } }
	).toArray();
	if (existing.length !== blogSeed.length) {
		throw new Error(`Expected ${blogSeed.length} existing articles; found ${existing.length}`);
	}
	for (const post of blogSeed) {
		const current = existing.find((entry) => entry.slug === post.slug);
		const previousContent = post.content.slice(0, -(blogDeepDives[post.slug] || "").length);
		if (current.content !== previousContent && current.content !== post.content) {
			throw new Error(`Article changed since the last sync: ${post.slug}`);
		}
	}
	const videoEditing = blogSeed.find((post) => post.slug === "video-editing-and-product-taste");
	const currentVideoEditing = existing.find((post) => post.slug === videoEditing.slug);
	if (![oldVideoEditingCover, videoEditing.coverImage].includes(currentVideoEditing.coverImage)) {
		throw new Error("Video editing cover has changed; review it before updating");
	}
	const entrify = await projects.findOne(
		{ title: /Entrify/i },
		{ projection: { title: 1, overview: 1 } }
	);
	if (!entrify || !["Patched overview works", overview].includes(entrify.overview)) {
		throw new Error("Entrify overview has changed; review it before updating");
	}
	if (apply && !backupPath) throw new Error("--backup=/absolute/path.json is required with --apply");
	if (backupPath) {
		await writeFile(backupPath, JSON.stringify({ blogs: existing, entrify }, null, 2));
	}
	if (apply) {
		for (const post of blogSeed) {
			if (existing.find((entry) => entry.slug === post.slug).content === post.content) continue;
			await blogs.updateOne(
				{ slug: post.slug, content: post.content.slice(0, -(blogDeepDives[post.slug] || "").length) },
				{ $set: { content: post.content, readTime: post.readTime, updatedAt: new Date() } }
			);
		}
		if (currentVideoEditing.coverImage === oldVideoEditingCover) {
			await blogs.updateOne(
				{ slug: videoEditing.slug, coverImage: oldVideoEditingCover },
				{ $set: { coverImage: videoEditing.coverImage, updatedAt: new Date() } }
			);
		}
		if (entrify.overview === "Patched overview works") {
			await projects.updateOne(
				{ _id: entrify._id, overview: "Patched overview works" },
				{ $set: { overview } }
			);
		}
	}
	console.log(`${apply ? "Updated" : "Ready to update"} ${blogSeed.length} articles`);
} finally {
	await client.close();
}
