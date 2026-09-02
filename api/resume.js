import clientPromise from "../lib/db.js";
import { Binary } from "mongodb";

export default async function handler(req, res) {
	try {
		const client = await clientPromise;
		const db = client.db("Nitin_Dev_Space");
		const collection = db.collection("Resume");

		if (req.method === "GET") {
			if (req.query?.meta === "1") {
				const meta = await collection.findOne({}, { projection: { data: 0 } });
				if (!meta) {
					return res.status(404).json({
						success: false,
						message: "No resume uploaded yet",
					});
				}
				return res.status(200).json({ success: true, data: meta });
			}

			const resume = await collection.findOne({});
			if (!resume?.data) {
				return res.status(404).json({
					success: false,
					message: "No resume uploaded yet",
				});
			}

			const buffer = Buffer.isBuffer(resume.data)
				? resume.data
				: resume.data.buffer
					? Buffer.from(resume.data.buffer)
					: Buffer.from(resume.data, "base64");

			res.setHeader(
				"Content-Type",
				resume.contentType || "application/pdf"
			);
			res.setHeader(
				"Content-Disposition",
				`inline; filename="${resume.filename || "Nitin_Resume.pdf"}"`
			);
			res.setHeader("Cache-Control", "no-store");
			return res.status(200).send(buffer);
		}

		if (req.method === "POST") {
			const { filename, contentType, data } = req.body || {};
			if (!data) {
				return res.status(400).json({
					success: false,
					message: "No resume file provided",
				});
			}

			const base64 = String(data).includes(",")
				? String(data).split(",")[1]
				: String(data);
			const binary = new Binary(Buffer.from(base64, "base64"));

			await collection.updateOne(
				{},
				{
					$set: {
						filename: filename || "Nitin_Resume.pdf",
						contentType: contentType || "application/pdf",
						data: binary,
						uploadedAt: new Date(),
					},
				},
				{ upsert: true }
			);

			return res.status(201).json({
				success: true,
				message: "Resume updated",
				data: {
					filename: filename || "Nitin_Resume.pdf",
					uploadedAt: new Date(),
				},
			});
		}

		if (req.method === "HEAD") {
			const resume = await collection.findOne({}, { projection: { data: 0 } });
			if (!resume) {
				return res.status(404).end();
			}
			res.setHeader("X-Resume-Filename", resume.filename || "Nitin_Resume.pdf");
			return res.status(200).end();
		}

		return res.status(405).json({
			success: false,
			message: "Method Not Allowed",
		});
	} catch (error) {
		console.error("Resume API error:", error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}
