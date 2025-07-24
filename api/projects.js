import clientPromise from "./db.js";
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

			const projects = await collection.find({}).toArray();

			return res.status(200).send({
				success: true,
				message: "Project fetched successfully",
				data: projects,
			});
		}

		if (method === "POST") {
			const newProject = await collection.insertOne(req.body);
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
			const updatedProject = await collection.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				{ $set: req.body }
			);
			if (!updatedProject) {
				console.log("Error Updating Project");
			}
			return res.status(200).send({
				success: true,
				message: "Project updated successfully",
			});
		}

		if (method === "DELETE") {
			await collection.findOneAndDelete({ _id: new ObjectId(query.id) });
			return res.status(200).send({
				success: true,
				message: "Project deleted successfully",
			});
		}
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
