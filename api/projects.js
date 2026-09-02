import clientPromise from "../lib/db.js";
import { ObjectId } from "mongodb";

export default async function projectsHandler(req, res) {
	try {
		const client = await clientPromise;
		const db = client.db("Nitin_Dev_Space");
		const collection = db.collection("Projects");

		const { method, query } = req;

		if (method === "GET") {
			if (query.id) {
				const project = await collection.findOne({
					_id: new ObjectId(query.id),
				});
				return res.status(200).send({
					success: true,
					message: "Project fetched successfully",
					data: project,
				});
			}

			const migrated = await collection.countDocuments({
				isKeyProject: { $exists: true },
			});
			if (migrated === 0) {
				await collection.updateMany({}, { $set: { isKeyProject: false } });
				await collection.updateMany(
					{ title: { $regex: /connectsphere|entrify|nitin dev space/i } },
					{ $set: { isKeyProject: true } }
				);
			}

			const filter = query.key === "1" ? { isKeyProject: true } : {};
			const projects = await collection.find(filter).toArray();

			return res.status(200).send({
				success: true,
				message: "Project fetched successfully",
				data: projects,
			});
		}

		if (method === "POST") {
			const newProject = await collection.insertOne({
				...req.body,
				isKeyProject: Boolean(req.body.isKeyProject),
				overview: req.body.overview || "",
				createdAt: new Date(),
			});
			if (!newProject) {
				console.log("Error Adding new Project");
			}
			return res.status(201).send({
				success: true,
				message: "Project added successfully",
			});
		}

		if (method === "PATCH") {
			const id = query.id;
			if (!id || !ObjectId.isValid(id)) {
				return res.status(400).json({
					success: false,
					message: "Valid project id is required",
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
					message: "Project not found",
				});
			}
			return res.status(200).send({
				success: true,
				message: "Project updated successfully",
			});
		}

		if (method === "DELETE") {
			const id = query.id;
			if (!id || !ObjectId.isValid(id)) {
				return res.status(400).json({
					success: false,
					message: "Valid project id is required",
				});
			}
			const result = await collection.deleteOne({ _id: new ObjectId(id) });
			if (result.deletedCount === 0) {
				return res.status(404).json({
					success: false,
					message: "Project not found",
				});
			}
			return res.status(200).send({
				success: true,
				message: "Project deleted successfully",
			});
		}

		return res.status(405).json({
			success: false,
			message: "Method Not Allowed",
		});
	} catch (error) {
		console.error("Detailed error:", {
			message: error.message,
			stack: error.stack,
			name: error.name,
		});
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}
