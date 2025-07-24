import clientPromise from "./db.js";

export default async function handler(req, res) {
	// console.log("Function invoked:", {
	// 	method: req.method,
	// 	headers: req.headers,
	// 	body: req.body,
	// });

	try {
		//console.log("Attempting database connection...");
		const client = await clientPromise;
		//console.log("Database connected successfully");
		const db = client.db("Nitin_Dev_Space");
		const collection = db.collection("Intro");

		if (req.method === "GET") {
			const introData = await collection.findOne({});
			return res.status(200).json({ success: true, data: introData });
		}

		if (req.method === "POST") {
			const payload = req.body;

			if (!payload) {
				return res.status(400).json({
					success: false,
					message: "No request body provided",
				});
			}

			await collection.updateOne({}, { $set: payload }, { upsert: true });

			return res.status(201).json({ success: true, message: "Intro Updated" });
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
