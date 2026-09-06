export const SITE_URL = "https://nitindevspace.com";
export const SITE_NAME = "Nitin Dev Space";
export const SITE_DESCRIPTION =
	"Nitin Dev Space is a software brand that designs and builds custom web apps, products, and freelance engineering work. Hire Nitin Kumar to create your next software project.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const INDEXABLE_ROBOTS =
	"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export const ROUTE_SEO = {
	"/": {
		title: "Nitin Dev Space | Freelance Software Brand for Custom Web Apps",
		description: SITE_DESCRIPTION,
	},
	"/profile": {
		title: "The Engineer Behind the Brand | Nitin Dev Space",
		description:
			"Meet Nitin Kumar, the full-stack engineer behind Nitin Dev Space — a software brand for custom web apps, products, and freelance builds.",
	},
	"/projects": {
		title: "Software Projects & Product Builds | Nitin Dev Space",
		description:
			"Custom software, web apps, and product builds created by Nitin Dev Space. See the work, then hire the brand to build yours.",
	},
	"/blogs": {
		title: "Insights from a Software Brand | Nitin Dev Space",
		description:
			"Writing from Nitin Dev Space on building software products, freelance engineering, and turning ideas into shipped web apps.",
	},
	"/contact": {
		title: "Hire a Freelance Software Developer | Nitin Dev Space",
		description:
			"Start a freelance software project with Nitin Dev Space. Hire a full-stack developer to design and build your web app or product.",
	},
	"/privacy-policies": {
		title: "Privacy Policy | Nitin Dev Space",
		description: "How Nitin Dev Space collects, uses, and protects visitor information.",
	},
	"/terms-conditions": {
		title: "Terms of Service | Nitin Dev Space",
		description: "Terms that govern use of the Nitin Dev Space website and freelance software services.",
	},
	"/cookie-settings": {
		title: "Cookie Settings | Nitin Dev Space",
		description: "Cookie preferences for Nitin Dev Space.",
	},
};

function upsertMeta(attr, key, content) {
	if (content == null || content === "") return;
	let el = document.head.querySelector(`meta[${attr}="${key}"]`);
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute(attr, key);
		document.head.appendChild(el);
	}
	el.setAttribute("content", content);
}

function upsertLink(rel, href) {
	if (!href) return;
	let el = document.head.querySelector(`link[rel="${rel}"]`);
	if (!el) {
		el = document.createElement("link");
		el.setAttribute("rel", rel);
		document.head.appendChild(el);
	}
	el.setAttribute("href", href);
}

export function applyJsonLd(id, data) {
	let el = document.getElementById(id);
	if (!data) {
		el?.remove();
		return;
	}
	if (!el) {
		el = document.createElement("script");
		el.type = "application/ld+json";
		el.id = id;
		document.head.appendChild(el);
	}
	el.textContent = JSON.stringify(data);
}

export function applySeo({
	title,
	description,
	path = "/",
	image,
	noindex = false,
	type = "website",
}) {
	const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
	const imageUrl = image
		? image.startsWith("http")
			? image
			: `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`
		: DEFAULT_OG_IMAGE;
	const robots = noindex ? "noindex, nofollow" : INDEXABLE_ROBOTS;

	document.title = title;
	upsertMeta("name", "description", description);
	upsertMeta("name", "robots", robots);
	upsertMeta("name", "googlebot", robots);
	upsertMeta("name", "bingbot", robots);
	upsertMeta("property", "og:title", title);
	upsertMeta("property", "og:description", description);
	upsertMeta("property", "og:url", url);
	upsertMeta("property", "og:type", type);
	upsertMeta("property", "og:image", imageUrl);
	upsertMeta("property", "og:image:secure_url", imageUrl);
	upsertMeta("property", "og:site_name", SITE_NAME);
	upsertMeta("name", "twitter:title", title);
	upsertMeta("name", "twitter:description", description);
	upsertMeta("name", "twitter:image", imageUrl);
	upsertLink("canonical", url);
}
