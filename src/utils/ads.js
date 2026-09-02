const AD_CLIENT = "ca-pub-9382808455958707";

export function ensureAdsScript() {
	if (typeof document === "undefined") return;
	if (document.querySelector("script[data-ns-ads]")) return;
	const script = document.createElement("script");
	script.async = true;
	script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
	script.crossOrigin = "anonymous";
	script.dataset.nsAds = "true";
	document.head.appendChild(script);
}

export { AD_CLIENT };
