import clientPromise from "./db.js";

export default async function handler(req, res) {
	try {
		const client = await clientPromise;
		const db = client.db("Nitin_Dev_Space");
		const collection = db.collection("messages");

		if (req.method === "POST") {
			const newMessage = await collection.insertOne(req.body);
			if (!newMessage) {
				console.log("Error Adding new Message");
			}
			return res.status(201).send({
				success: true,
				message: "Message sent successfully",
			});
		}

		if (req.method === "GET") {
			const messages = await collection.find({}).toArray();

			return res.status(200).send({
				success: true,
				message: "Messages fetched successfully",
				data: messages,
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
