import React, { useEffect, useRef } from "react";

const COLORS = ["#e1b666", "#add6e9", "#ff8b60", "#be4673", "#0793e8", "#3F567F"];

function MouseTrail() {
	const canvasRef = useRef(null);
	const pointsRef = useRef([]);
	const mouseRef = useRef({ x: -999, y: -999 });
	const rafRef = useRef(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resize();

		const onMove = (e) => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
			for (let i = 0; i < 2; i++) {
				pointsRef.current.push({
					x: e.clientX + (Math.random() - 0.5) * 10,
					y: e.clientY + (Math.random() - 0.5) * 10,
					vx: (Math.random() - 0.5) * 1.2,
					vy: (Math.random() - 0.5) * 1.2 - 0.4,
					life: 1,
					size: 3 + Math.random() * 5,
					color: COLORS[Math.floor(Math.random() * COLORS.length)],
				});
			}
			if (pointsRef.current.length > 140) {
				pointsRef.current.splice(0, pointsRef.current.length - 140);
			}
		};

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const next = [];
			for (const p of pointsRef.current) {
				p.x += p.vx;
				p.y += p.vy;
				p.life -= 0.02;
				if (p.life <= 0) continue;
				ctx.beginPath();
				ctx.fillStyle = p.color;
				ctx.globalAlpha = p.life * 0.55;
				ctx.shadowBlur = 12;
				ctx.shadowColor = p.color;
				ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
				ctx.fill();
				next.push(p);
			}
			pointsRef.current = next;
			ctx.globalAlpha = 1;
			rafRef.current = requestAnimationFrame(draw);
		};

		window.addEventListener("mousemove", onMove, { passive: true });
		window.addEventListener("resize", resize);
		rafRef.current = requestAnimationFrame(draw);

		return () => {
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(rafRef.current);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 pointer-events-none z-[60]"
			aria-hidden="true"
		/>
	);
}

export default MouseTrail;
