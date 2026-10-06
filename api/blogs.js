import clientPromise from "../lib/db.js";
import { ObjectId } from "mongodb";
import { blogSeed } from "../lib/data/blogSeed.js";
import { requireAdmin } from "../lib/adminAuth.js";

async function ensureSeed(collection) {
	const count = await collection.countDocuments();
	if (count === 0) {
		await collection.insertMany(blogSeed);
	}
}

export default async function handler(req, res) {
	try {
		const client = await clientPromise;
		const db = client.db("Nitin_Dev_Space");
		const collection = db.collection("Blogs");
		const { method, query } = req;

		if (method === "GET") {
			await ensureSeed(collection);

			if (query.id) {
				if (!requireAdmin(req, res)) return;
				const blog = await collection.findOne({ _id: new ObjectId(query.id) });
				return res.status(200).send({
					success: true,
					message: "Blog fetched successfully",
					data: blog,
				});
			}

			if (query.slug) {
				const blog = await collection.findOne({ slug: query.slug, published: true });
				return res.status(200).send({
					success: true,
					message: "Blog fetched successfully",
					data: blog,
				});
			}

			if (query.all === "1" && !requireAdmin(req, res)) return;
			const filter = query.all === "1" ? {} : { published: true };
			const blogs = await collection
				.find(filter)
				.project(query.all === "1" ? {} : { content: 0 })
				.sort({ createdAt: -1 })
				.toArray();

			return res.status(200).send({
				success: true,
				message: "Blogs fetched successfully",
				data: blogs,
			});
		}

		if (method === "POST") {
			if (!requireAdmin(req, res)) return;
			const payload = {
				...req.body,
				published: req.body.published !== false,
				createdAt: req.body.createdAt
					? new Date(req.body.createdAt)
					: new Date(),
				updatedAt: new Date(),
			};
			await collection.insertOne(payload);
			return res.status(201).send({
				success: true,
				message: "Blog added successfully",
			});
		}

		if (method === "PATCH") {
			if (!requireAdmin(req, res)) return;
			const id = query.id;
			if (!id || !ObjectId.isValid(id)) {
				return res.status(400).json({
					success: false,
					message: "Valid blog id is required",
				});
			}
			const { _id, ...rest } = req.body || {};
			const result = await collection.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: { ...rest, updatedAt: new Date() } }
			);
			if (result.matchedCount === 0) {
				return res.status(404).json({
					success: false,
					message: "Blog not found",
				});
			}
			return res.status(200).send({
				success: true,
				message: "Blog updated successfully",
			});
		}

		if (method === "DELETE") {
			if (!requireAdmin(req, res)) return;
			const id = query.id;
			if (!id || !ObjectId.isValid(id)) {
				return res.status(400).json({
					success: false,
					message: "Valid blog id is required",
				});
			}
			const result = await collection.deleteOne({ _id: new ObjectId(id) });
			if (result.deletedCount === 0) {
				return res.status(404).json({
					success: false,
					message: "Blog not found",
				});
			}
			return res.status(200).send({
				success: true,
				message: "Blog deleted successfully",
			});
		}

		return res.status(405).json({
			success: false,
			message: "Method Not Allowed",
		});
	} catch (error) {
		console.error("Blogs API error:", error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}
