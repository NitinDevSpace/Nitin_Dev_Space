import clientPromise from "./db.js";

export default async function handler(req, res) {
	try {
		//establish DB connection
		const client = await clientPromise;
		const db = client.db("Nitin_Dev_Space");
		const collection = db.collection("About_Me");

		if (req.method === "GET") {
			const aboutMe = await collection.findOne({});
			return res.status(200).send({ success: true, data: aboutMe });
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
			return res
				.status(201)
				.send({ success: true, message: "About me Updated" });
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
