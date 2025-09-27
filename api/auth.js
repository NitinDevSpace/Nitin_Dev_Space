// /api/auth.js
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const COOKIE_NAME = process.env.ADMIN_COOKIE_NAME || "admin_token";
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 5; // 7 days

export default async function handler(req, res) {
	if (req.method !== "POST") return res.status(405).end();

	const { password } = await req.json();

	// Compare with server-side environment password
	if (!process.env.ADMIN_PASSWORD) {
		return res
			.status(500)
			.json({ ok: false, message: "Server not configured" });
	}

	if (password !== process.env.ADMIN_PASSWORD) {
		return res.status(401).json({ ok: false, message: "Invalid password" });
	}

	const token = jwt.sign({ role: "admin" }, JWT_SECRET, {
		expiresIn: `${TOKEN_MAX_AGE}s`,
	});

	const cookie = serialize(COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: TOKEN_MAX_AGE,
	});

	res.setHeader("Set-Cookie", cookie);
	res.status(200).json({ ok: true });
}
