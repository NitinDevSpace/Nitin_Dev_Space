// /api/check-auth.js
import jwt from "jsonwebtoken";
import { parse } from "cookie";

const COOKIE_NAME = process.env.ADMIN_COOKIE_NAME || "admin_token";
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

export default async function handler(req, res) {
	try {
		const cookieHeader = req.headers.cookie || "";
		const cookies = parse(cookieHeader || "");
		const token = cookies[COOKIE_NAME];

		if (!token) return res.status(200).json({ ok: false });

		const decoded = jwt.verify(token, JWT_SECRET);
		// Optionally confirm decoded contents
		if (decoded && decoded.role === "admin") {
			return res.status(200).json({ ok: true });
		} else {
			return res.status(200).json({ ok: false });
		}
	} catch (err) {
		return res.status(200).json({ ok: false });
	}
}
