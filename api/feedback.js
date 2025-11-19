import clientPromise from "./db.js";

export default async function handler(req, res) {
	try {
		//establish DB connection
		const client = await clientPromise;
		const db = client.db("Nitin_Dev_Space");
		const collection = db.collection("feedbacks");

		if (req.method === "GET") {
			const feedbacks = await collection.find({}).toArray();
			return res.status(200).send({ success: true, data: feedbacks });
		}

		if (req.method === "POST") {
			const payload = req.body;
			if (!payload) {
				return res.status(400).json({
					success: false,
					message: "No request body provided",
				});
			}
			await collection.insertOne(payload);
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
