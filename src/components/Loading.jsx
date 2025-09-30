import React from "react";

// Loading skeleton with a left-to-right shimmer + a pulse fallback.
// - Local keyframes provide a visible shimmer even if Tailwind's animation
//   utilities aren't active or available in your build.
// - `size` accepts a CSS size string ('8rem', '100px') or a number (pixels).
// - Keep any extra tailwind classes via `className` prop.
export default function Loading({ size = "40rem", className = "opacity-60" }) {
	// Accept either number (px) or string size
	const style =
		typeof size === "number"
			? { width: `${size}px`, height: `${size}px` }
			: { width: size, height: size };

	return (
		<div
			className={`rounded-md bg-white-900 relative overflow-hidden ${className}`}
			style={style}
			role="status"
			aria-label="Loading"
		>

			{/* Shimmer overlay: left-to-right moving highlight using local keyframes */}
			<div className="nd-loading-shimmer" aria-hidden="true" />

			{/* Local CSS for shimmer animation — no external Tailwind plugin required */}
			<style>{`
        .nd-loading-shimmer {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.8) 50%,
            rgba(255,255,255,0) 100%
          );
          animation: nd-shimmer 1.2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes nd-shimmer {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        /* Optional: respect user motion preferences by disabling the shimmer */
        @media (prefers-reduced-motion: reduce) {
          .nd-loading-shimmer {
            animation: none;
            opacity: 0; /* keep it subtle if user prefers reduced motion */
          }
        }
      `}</style>
		</div>
	);
}
