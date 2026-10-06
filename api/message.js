import clientPromise from "../lib/db.js";
import { requireAdmin } from "../lib/adminAuth.js";

export default async function handler(req, res) {
	try {
		const client = await clientPromise;
		const db = client.db("Nitin_Dev_Space");
		const collection = db.collection("messages");

		if (req.method === "POST") {
			const { fullName, email, phoneNumber, subject, message } = req.body || {};
			const payload = {
				fullName: String(fullName || "").trim().slice(0, 120),
				email: String(email || "").trim().slice(0, 254),
				phoneNumber: String(phoneNumber || "").trim().slice(0, 40),
				subject: String(subject || "").trim().slice(0, 200),
				message: String(message || "").trim().slice(0, 5000),
				createdAt: new Date(),
			};
			if (!payload.fullName || !payload.email.includes("@") || !payload.subject || !payload.message) {
				return res.status(400).json({ success: false, message: "Please complete the required fields." });
			}
			const newMessage = await collection.insertOne(payload);
			if (!newMessage) {
				console.log("Error Adding new Message");
			}
			return res.status(201).send({
				success: true,
				message: "Message sent successfully",
			});
		}

		if (req.method === "GET") {
			if (!requireAdmin(req, res)) return;
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
