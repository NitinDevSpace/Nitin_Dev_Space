import React, { useEffect, useRef } from "react";
import { AD_CLIENT, ensureAdsScript } from "../utils/ads";

function AdSlot({ slot, format = "auto", className = "", label = "Advertisement" }) {
	const pushed = useRef(false);

	useEffect(() => {
		ensureAdsScript();
		if (pushed.current) return;
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
			pushed.current = true;
		} catch {
			// Ad blockers or first paint before the script loads.
		}
	}, []);

	return (
		<aside
			className={`border border-white/10 bg-primary3/80 rounded-lg overflow-hidden ${className}`}
			aria-label={label}
		>
			<p className="text-[10px] uppercase tracking-[0.2em] text-white/40 px-3 pt-2">
				{label}
			</p>
			<ins
				className="adsbygoogle block"
				style={{ display: "block", minHeight: 90 }}
				data-ad-client={AD_CLIENT}
				data-ad-slot={slot}
				data-ad-format={format}
				data-full-width-responsive="true"
			/>
		</aside>
	);
}

export default AdSlot;
