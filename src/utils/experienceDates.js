const MONTHS = [
	"Jan",
	"Feb",
	"March",
	"April",
	"May",
	"June",
	"July",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];

const MONTH_LOOKUP = {
	jan: 1,
	january: 1,
	feb: 2,
	february: 2,
	mar: 3,
	march: 3,
	apr: 4,
	april: 4,
	may: 5,
	jun: 6,
	june: 6,
	jul: 7,
	july: 7,
	aug: 8,
	august: 8,
	sep: 9,
	sept: 9,
	september: 9,
	oct: 10,
	october: 10,
	nov: 11,
	november: 11,
	dec: 12,
	december: 12,
	early: 1,
	mid: 6,
	late: 12,
};

function padMonth(n) {
	return String(n).padStart(2, "0");
}

export function currentMonthValue() {
	const now = new Date();
	return `${now.getFullYear()}-${padMonth(now.getMonth() + 1)}`;
}

export function formatMonthYear(value) {
	if (!value || !/^\d{4}-\d{2}$/.test(value)) return "";
	const [year, month] = value.split("-");
	const idx = Number(month) - 1;
	if (idx < 0 || idx > 11) return value;
	return `${MONTHS[idx]} ${year}`;
}

export function formatExperiencePeriod(exp = {}) {
	const startLabel = formatMonthYear(exp.start);
	if (!startLabel && exp.period) return exp.period;
	if (!startLabel) return "";
	if (exp.isCurrent || !exp.end) return `${startLabel} - Present`;
	const endLabel = formatMonthYear(exp.end);
	return endLabel ? `${startLabel} - ${endLabel}` : `${startLabel} - Present`;
}

function parseMonthToken(token = "") {
	const cleaned = String(token).trim().toLowerCase().replace(/[.,]/g, "");
	if (!cleaned) return null;
	if (/^\d{4}-\d{2}$/.test(cleaned)) return cleaned;

	const parts = cleaned.split(/[\s/_-]+/).filter(Boolean);
	let month;
	let year;

	for (const part of parts) {
		if (/^\d{4}$/.test(part)) year = Number(part);
		else if (MONTH_LOOKUP[part]) month = MONTH_LOOKUP[part];
		else if (/^\d{1,2}$/.test(part)) {
			const n = Number(part);
			if (n >= 1 && n <= 12) month = n;
		}
	}

	if (!year) return null;
	return `${year}-${padMonth(month || 1)}`;
}

export function parseLoosePeriod(period = "") {
	const text = String(period || "").trim();
	if (!text) {
		return { start: "", end: "", isCurrent: false };
	}

	const lower = text.toLowerCase();
	const isCurrent = /\b(present|current|now|ongoing)\b/.test(lower);
	const parts = text.split(/\s*(?:-|–|—|\bto\b)\s*/i).filter(Boolean);
	const start = parseMonthToken(parts[0] || "") || "";
	const end = isCurrent ? "" : parseMonthToken(parts[1] || "") || "";

	return { start, end, isCurrent: isCurrent || !end };
}

export function normalizeExperience(exp = {}) {
	let start = exp.start || "";
	let end = exp.end || "";
	let isCurrent = Boolean(exp.isCurrent);

	if ((!start || (!end && !isCurrent)) && exp.period) {
		const parsed = parseLoosePeriod(exp.period);
		start = start || parsed.start;
		end = end || parsed.end;
		isCurrent = isCurrent || parsed.isCurrent;
	}

	if (isCurrent) end = "";

	const normalized = {
		...exp,
		start,
		end,
		isCurrent,
	};
	normalized.period = formatExperiencePeriod(normalized);
	return normalized;
}

function sortValue(exp) {
	// Current roles sort above finished ones; then by start (newest first).
	if (exp.isCurrent || !exp.end) return Number.MAX_SAFE_INTEGER;
	const [y, m] = String(exp.end).split("-").map(Number);
	if (!y) return 0;
	return y * 12 + (m || 1);
}

function startValue(exp) {
	const [y, m] = String(exp.start || "").split("-").map(Number);
	if (!y) return 0;
	return y * 12 + (m || 1);
}

export function sortExperiences(list = []) {
	return [...list]
		.map(normalizeExperience)
		.sort((a, b) => {
			const endDiff = sortValue(b) - sortValue(a);
			if (endDiff !== 0) return endDiff;
			return startValue(b) - startValue(a);
		});
}

export function newExperience() {
	return {
		start: currentMonthValue(),
		end: "",
		isCurrent: true,
		period: "",
		title: "",
		company: "",
		location: "",
		bullets: [""],
	};
}
