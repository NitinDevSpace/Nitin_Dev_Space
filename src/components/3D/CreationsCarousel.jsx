import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjectOverview } from "../../utils/text";

const CARD_GAP = 20;
const getCardWidth = () => {
	if (typeof window === "undefined") return 340;
	return Math.min(340, Math.max(260, window.innerWidth - 48));
};

function CreationsCarousel({ projects }) {
	const navigate = useNavigate();
	const [paused, setPaused] = useState(false);
	const [cardWidth, setCardWidth] = useState(getCardWidth);
	const pausedRef = useRef(false);
	const trackRef = useRef(null);
	const offsetRef = useRef(0);
	const halfWidthRef = useRef(0);

	const cards = useMemo(() => projects.filter(Boolean), [projects]);
	const loopCards = useMemo(() => {
		if (!cards.length) return [];
		// Duplicate enough times so wide screens still loop seamlessly.
		const copies = cards.length < 4 ? 4 : 2;
		return Array.from({ length: copies }, () => cards).flat();
	}, [cards]);

	useEffect(() => {
		pausedRef.current = paused;
	}, [paused]);

	useEffect(() => {
		const measure = () => {
			setCardWidth(getCardWidth());
			if (!trackRef.current) return;
			halfWidthRef.current = trackRef.current.scrollWidth / 2;
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [loopCards.length]);

	useEffect(() => {
		let last = performance.now();
		let frame;
		const tick = (now) => {
			const dt = Math.min((now - last) / 1000, 0.05);
			last = now;
			if (!pausedRef.current && trackRef.current) {
				offsetRef.current -= 55 * dt;
				const half = halfWidthRef.current || trackRef.current.scrollWidth / 2;
				if (half > 0 && Math.abs(offsetRef.current) >= half) {
					offsetRef.current += half;
				}
				trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, []);

	if (!cards.length) return null;

	return (
		<div
			className="relative w-full h-full overflow-hidden rounded-lg"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			onTouchStart={() => setPaused(true)}
			onTouchEnd={() => setPaused(false)}
		>
			<div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-primary3 to-transparent" />
			<div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-primary3 to-transparent" />

			<div className="absolute inset-0 flex items-center">
				<div
					ref={trackRef}
					className="flex items-center will-change-transform"
					style={{ gap: CARD_GAP, transform: "translate3d(0,0,0)" }}
				>
					{loopCards.map((project, index) => {
						const cover =
							project.image ||
							(Array.isArray(project.crousel) && project.crousel[0]) ||
							"";
						return (
							<button
								key={`${project._id}-${index}`}
								type="button"
								onClick={() => navigate(`/projects/${project._id}`)}
								className="shrink-0 text-left border border-white/15 rounded-2xl overflow-hidden bg-primary2 shadow-2xl hover:border-accent2/50 sm:hover:scale-[1.02] transition-transform duration-300"
								style={{
									width: cardWidth,
									height: Math.round(cardWidth * 1.15),
								}}
							>
								<img
									src={cover}
									alt={project.title}
									className="w-full h-[45%] object-cover"
								/>
								<div className="p-3 sm:p-4 flex flex-col gap-2">
									<h3 className="text-sm sm:text-base font-semibold line-clamp-2">
										{project.title}
									</h3>
									<p className="text-xs opacity-70 line-clamp-3">
										{getProjectOverview(project, 110)}
									</p>
									<div className="flex flex-wrap gap-1.5 mt-1">
										{(project.techStack || []).slice(0, 3).map((tech) => (
											<span
												key={`${project._id}-${tech}-${index}`}
												className="px-2 py-0.5 bg-accent1/20 rounded text-[10px]"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default CreationsCarousel;
