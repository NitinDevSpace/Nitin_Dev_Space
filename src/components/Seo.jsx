import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { applyJsonLd, applySeo, ROUTE_SEO, SITE_NAME } from "../utils/seo";

function Seo() {
	const { pathname } = useLocation();

	useEffect(() => {
		const isDynamicDetail =
			matchPath("/blogs/:slug", pathname) || matchPath("/projects/:id", pathname);
		if (isDynamicDetail) return;

		if (pathname.startsWith("/admin")) {
			applySeo({
				title: `Studio | ${SITE_NAME}`,
				description: "Private content studio for Nitin Dev Space.",
				path: pathname,
				noindex: true,
			});
			applyJsonLd("nd-jsonld-page", null);
			return;
		}

		const route = ROUTE_SEO[pathname];
		if (route) {
			applySeo({ ...route, path: pathname });
			applyJsonLd("nd-jsonld-page", null);
			return;
		}

		applySeo({
			title: `Page not found | ${SITE_NAME}`,
			description: "This page does not exist on Nitin Dev Space.",
			path: pathname,
			noindex: true,
		});
		applyJsonLd("nd-jsonld-page", null);
	}, [pathname]);

	return null;
}

export default Seo;
