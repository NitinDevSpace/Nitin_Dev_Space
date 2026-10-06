import clientPromise from "../lib/db.js";
import { requireAdmin } from "../lib/adminAuth.js";

export default async function handler(req, res) {
	try {
		//establish DB connection
		const client = await clientPromise;
		const db = client.db("Nitin_Dev_Space");
		const collection = db.collection("feedbacks");

		if (req.method === "GET") {
			if (!requireAdmin(req, res)) return;
			const feedbacks = await collection.find({}).toArray();
			return res.status(200).send({ success: true, data: feedbacks });
		}

		if (req.method === "POST") {
			const rating = Number(req.body?.rating || 0);
			const feedback = String(req.body?.feedback || "").trim().slice(0, 2000);
			if ((!rating && !feedback) || !Number.isInteger(rating) || rating < 0 || rating > 5) {
				return res.status(400).json({
					success: false,
					message: "Add a rating or feedback.",
				});
			}
			await collection.insertOne({ rating, feedback, date: new Date().toISOString() });
			return res
				.status(201)
				.send({ success: true, message: "Feedback Submitted" });
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
