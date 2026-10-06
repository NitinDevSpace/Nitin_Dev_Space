import process from "node:process";
import { writeFile } from "node:fs/promises";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { blogSeed } from "../lib/data/blogSeed.js";

dotenv.config({ path: process.env.SOURCE_ENV_FILE || ".env", quiet: true });
if (!process.env.DB_URL) throw new Error("DB_URL is required");

const apply = process.argv.includes("--apply");
const backupArg = process.argv.find((arg) => arg.startsWith("--backup="));
const backupPath = backupArg?.slice("--backup=".length);
const client = new MongoClient(process.env.DB_URL, { serverSelectionTimeoutMS: 8000 });
const overview = "Event ticket booking platform with seat selection, verified Stripe payments, and dashboards for customers, theater owners, and admins.";

try {
	await client.connect();
	const db = client.db("Nitin_Dev_Space");
	const blogs = db.collection("Blogs");
	const projects = db.collection("Projects");
	const existing = await blogs.find(
		{ slug: { $in: blogSeed.map((post) => post.slug) } },
		{ projection: { slug: 1, content: 1, readTime: 1, updatedAt: 1 } }
	).toArray();
	if (existing.length !== blogSeed.length) {
		throw new Error(`Expected ${blogSeed.length} existing articles; found ${existing.length}`);
	}
	const entrify = await projects.findOne(
		{ title: /Entrify/i },
		{ projection: { title: 1, overview: 1 } }
	);
	if (!entrify || entrify.overview !== "Patched overview works") {
		throw new Error("Entrify overview has changed; review it before updating");
	}
	if (apply && !backupPath) throw new Error("--backup=/absolute/path.json is required with --apply");
	if (backupPath) {
		await writeFile(backupPath, JSON.stringify({ blogs: existing, entrify }, null, 2));
	}
	if (apply) {
		for (const post of blogSeed) {
			await blogs.updateOne(
				{ slug: post.slug },
				{ $set: { content: post.content, readTime: post.readTime, updatedAt: new Date() } }
			);
		}
		await projects.updateOne(
			{ _id: entrify._id, overview: "Patched overview works" },
			{ $set: { overview } }
		);
	}
	console.log(`${apply ? "Updated" : "Ready to update"} ${blogSeed.length} articles and the Entrify overview`);
} finally {
	await client.close();
}
