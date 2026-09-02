import clientPromise from "./db.js";
import { profileSeed } from "./data/profileSeed.js";

export default async function handler(req, res) {
	try {
		const client = await clientPromise;
		const db = client.db("Nitin_Dev_Space");
		const collection = db.collection("Profile");

		if (req.method === "GET") {
			let profile = await collection.findOne({});
			if (!profile) {
				await collection.insertOne({ ...profileSeed, updatedAt: new Date() });
				profile = await collection.findOne({});
			}
			return res.status(200).send({ success: true, data: profile });
		}

		if (req.method === "POST") {
			const payload = req.body;
			if (!payload) {
				return res.status(400).json({
					success: false,
					message: "No request body provided",
				});
			}
			const { _id, ...rest } = payload;
			await collection.updateOne(
				{},
				{ $set: { ...rest, updatedAt: new Date() } },
				{ upsert: true }
			);
			return res
				.status(201)
				.send({ success: true, message: "Profile updated" });
		}

		return res.status(405).json({
			success: false,
			message: "Method Not Allowed",
		});
	} catch (error) {
		console.error("Profile API error:", error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}
