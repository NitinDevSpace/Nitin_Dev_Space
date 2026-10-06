import { createHmac, timingSafeEqual } from "node:crypto";
import { Buffer } from "node:buffer";
import process from "node:process";

const COOKIE_NAME = "nd_admin";
const SESSION_SECONDS = 8 * 60 * 60;

function signingKey() {
	const key = process.env.ADMIN_SESSION_SECRET || process.env.DB_URL;
	if (!key) throw new Error("Admin session signing key is not configured");
	return key;
}

function signature(expiresAt) {
	return createHmac("sha256", signingKey())
		.update(String(expiresAt))
		.digest("hex");
}

export function setAdminSession(res) {
	const expiresAt = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
	const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
	res.setHeader(
		"Set-Cookie",
		`${COOKIE_NAME}=${expiresAt}.${signature(expiresAt)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_SECONDS}${secure}`
	);
}

export function isAdmin(req) {
	const cookie = (req.headers.cookie || "")
		.split(";")
		.map((part) => part.trim())
		.find((part) => part.startsWith(`${COOKIE_NAME}=`));
	if (!cookie) return false;
	const [expiresText, suppliedSignature] = cookie.slice(COOKIE_NAME.length + 1).split(".");
	const expiresAt = Number(expiresText);
	if (!Number.isSafeInteger(expiresAt) || expiresAt <= Date.now() / 1000) return false;
	if (!/^[a-f0-9]{64}$/.test(suppliedSignature || "")) return false;
	const expected = Buffer.from(signature(expiresAt), "hex");
	return timingSafeEqual(expected, Buffer.from(suppliedSignature, "hex"));
}

export function requireAdmin(req, res) {
	if (isAdmin(req)) return true;
	res.status(401).json({ success: false, message: "Admin sign-in required" });
	return false;
}
