import test from "node:test";
import assert from "node:assert/strict";
import process from "node:process";
import { isAdmin, requireAdmin, setAdminSession } from "../lib/adminAuth.js";

process.env.ADMIN_SESSION_SECRET = "test-only-session-secret";

test("admin session accepts a signed cookie and rejects a changed signature", () => {
	let cookie;
	setAdminSession({ setHeader: (_name, value) => { cookie = value; } });
	const value = cookie.split(";")[0];
	assert.equal(isAdmin({ headers: { cookie: value } }), true);
	const changed = value.slice(0, -1) + (value.endsWith("0") ? "1" : "0");
	assert.equal(isAdmin({ headers: { cookie: changed } }), false);
	assert.equal(isAdmin({ headers: {} }), false);
});

test("unauthenticated admin request returns 401", () => {
	let status;
	const res = {
		status(code) { status = code; return this; },
		json() { return this; },
	};
	assert.equal(requireAdmin({ headers: {} }, res), false);
	assert.equal(status, 401);
});
