import { log } from "three/tsl";
import clientPromise from "./db.js";

export default async function handler(req, res) {
	try {
		//establish DB connection
		const client = await clientPromise;
		const db = client.db("Nitin_Dev_Space");
		const collection = db.collection("password");

		if (req.method === "POST") {
			const password = await collection.findOne({});
			if(password.password !== req.body.password){
				return res.status(200).send({ success: false });
			}
			return res.status(200).send({ success: true });
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
