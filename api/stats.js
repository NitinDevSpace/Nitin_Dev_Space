import clientPromise from "../lib/db.js";
import { ObjectId } from "mongodb";

function monthKey(date) {
	const d = new Date(date);
	if (Number.isNaN(d.getTime())) return null;
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function createdAt(doc) {
	if (doc?.createdAt) return new Date(doc.createdAt);
	if (doc?.date) return new Date(doc.date);
	if (doc?._id) {
		try {
			return new ObjectId(doc._id).getTimestamp();
		} catch {
			return null;
		}
	}
	return null;
}

export default async function handler(req, res) {
	try {
		if (req.method !== "GET") {
			return res.status(405).json({ success: false, message: "Method Not Allowed" });
		}

		const client = await clientPromise;
		const db = client.db("Nitin_Dev_Space");

		const [projects, blogs, messages, feedbacks, resume] = await Promise.all([
			db.collection("Projects").find({}).toArray(),
			db.collection("Blogs").find({}).project({ content: 0 }).toArray(),
			db.collection("messages").find({}).toArray(),
			db.collection("feedbacks").find({}).toArray(),
			db.collection("Resume").findOne({}, { projection: { data: 0 } }),
		]);

		const statusCounts = projects.reduce((acc, project) => {
			const status = project.status || "Unknown";
			acc[status] = (acc[status] || 0) + 1;
			return acc;
		}, {});

		const now = new Date();
		const months = [];
		for (let i = 5; i >= 0; i--) {
			const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
			months.push(monthKey(d));
		}

		const messageByMonth = Object.fromEntries(months.map((m) => [m, 0]));
		messages.forEach((msg) => {
			const key = monthKey(createdAt(msg));
			if (key && key in messageByMonth) messageByMonth[key] += 1;
		});

		const ratings = feedbacks
			.map((f) => Number(f.rating))
			.filter((n) => !Number.isNaN(n) && n > 0);
		const avgRating = ratings.length
			? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
			: 0;

		const ratingBuckets = [1, 2, 3, 4, 5].map((star) => ({
			name: `${star}★`,
			value: ratings.filter((r) => r === star).length,
		}));

		return res.status(200).json({
			success: true,
			data: {
				totals: {
					projects: projects.length,
					keyProjects: projects.filter((p) => p.isKeyProject).length,
					blogs: blogs.length,
					publishedBlogs: blogs.filter((b) => b.published).length,
					messages: messages.length,
					feedbacks: feedbacks.length,
					avgRating,
					hasResume: Boolean(resume),
				},
				statusCounts,
				projectsByStatus: Object.entries(statusCounts).map(([name, value]) => ({
					name,
					value,
				})),
				messagesOverTime: months.map((month) => ({
					month,
					count: messageByMonth[month],
				})),
				ratingBuckets,
				recentMessages: messages
					.slice()
					.sort((a, b) => (createdAt(b) || 0) - (createdAt(a) || 0))
					.slice(0, 5),
				resume: resume
					? { filename: resume.filename, uploadedAt: resume.uploadedAt }
					: null,
			},
		});
	} catch (error) {
		console.error("Stats API error:", error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}
