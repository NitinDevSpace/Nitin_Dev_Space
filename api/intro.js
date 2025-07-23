const clientPromise = require("./db"); 

module.exports = async function handler(req, res) {
	try {
		const client = await clientPromise;
		const db = client.db("Nitin_Dev_Space"); 
		const collection = db.collection("Intro");

		if (req.method === "GET") {
			const introData = await collection.findOne({});
			return res.status(200).json({ success: true, data: introData });
		}

		if (req.method === "POST") {
			const payload = req.body;
			const result = await collection.insertOne(payload);
			return res.status(201).json({ success: true, data: result });
		}

		return res
			.status(405)
			.json({ success: false, message: "Method Not Allowed" });
	} catch (error) {
		console.error("Error in /api/intro.js:", error);
		return res.status(500).json({ success: false, message: error.message });
	}
};
