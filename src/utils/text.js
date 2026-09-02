export function stripHtml(html = "") {
	return String(html)
		.replace(/<[^>]*>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\s+/g, " ")
		.trim();
}

export function briefText(html = "", max = 90) {
	const text = stripHtml(html);
	if (!text) return "";
	if (text.length <= max) return text;
	return `${text.slice(0, max).trim()}…`;
}

export function getProjectOverview(project, max = 90) {
	if (project?.overview) return briefText(project.overview, max);
	return briefText(project?.description, max);
}

export function slugify(text = "") {
	return String(text)
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

export function createdAtFromDoc(doc) {
	if (!doc) return null;
	if (doc.createdAt) return new Date(doc.createdAt);
	if (doc.date) return new Date(doc.date);
	if (doc._id && typeof doc._id === "string" && doc._id.length >= 8) {
		const seconds = parseInt(doc._id.substring(0, 8), 16);
		if (!Number.isNaN(seconds)) return new Date(seconds * 1000);
	}
	return null;
}
