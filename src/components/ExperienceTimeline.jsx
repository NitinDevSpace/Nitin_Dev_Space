import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

function FloatingNodes() {
	const group = useRef();
	useFrame((state) => {
		if (!group.current) return;
		group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.35;
		group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
	});

	return (
		<group ref={group}>
			<ambientLight intensity={0.7} />
			<pointLight position={[2, 2, 3]} color="#e1b666" intensity={1.4} />
			{[0, 1, 2, 3].map((i) => (
				<mesh key={i} position={[0, 1.6 - i * 1.05, 0]}>
					<sphereGeometry args={[0.12, 16, 16]} />
					<meshStandardMaterial
						color="#e1b666"
						emissive="#e1b666"
						emissiveIntensity={0.6}
						metalness={0.5}
						roughness={0.25}
					/>
				</mesh>
			))}
			<mesh position={[0, 0, 0]}>
				<cylinderGeometry args={[0.025, 0.025, 4.2, 12]} />
				<meshStandardMaterial color="#add6e9" transparent opacity={0.45} />
			</mesh>
		</group>
	);
}

function ExperienceCard({ item, index }) {
	const ref = useRef(null);
	const inView = useInView(ref, { once: false, amount: 0.35 });

	return (
		<motion.li
			ref={ref}
			initial={{ opacity: 0, y: 40, rotateX: 18 }}
			animate={
				inView
					? { opacity: 1, y: 0, rotateX: 0 }
					: { opacity: 0.35, y: 24, rotateX: 12 }
			}
			transition={{ duration: 0.6, delay: 0.05 * index, ease: "easeOut" }}
			className="relative pl-8"
			style={{ transformStyle: "preserve-3d" }}
		>
			<span className="absolute left-[-11px] top-3 w-5 h-5 rounded-full bg-accent2 shadow-[0_0_16px_#e1b666] border-4 border-primary2" />
			<motion.div
				whileHover={{ rotateY: -6, scale: 1.01 }}
				transition={{ type: "spring", stiffness: 220, damping: 18 }}
				className="rounded-xl border border-white/15 bg-primary/70 p-5 shadow-xl"
				style={{ transformStyle: "preserve-3d" }}
			>
				<div className="flex gap-1 items-center bg-accent1/30 w-fit p-1 px-2 rounded-lg text-xs text-white/50 mb-2">
					<Calendar size={16} className="text-accent1/70" /> {item.period}
				</div>
				<h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
				<div className="text-sm opacity-70 font-extralight my-2">
					<div className="flex flex-wrap gap-2">
						<div className="flex gap-2 items-center">
							<Briefcase size={16} /> {item.company}
						</div>
						<span className="opacity-40">|</span>
						<div className="flex gap-2 items-center">
							<MapPin size={16} /> {item.location}
						</div>
					</div>
				</div>
				<ul className="list-disc text-sm opacity-70 ml-4 font-extralight space-y-1">
					{(item.bullets || []).map((bullet, i) => (
						<li key={i} dangerouslySetInnerHTML={{ __html: bullet }} />
					))}
				</ul>
			</motion.div>
		</motion.li>
	);
}

function ExperienceTimeline({ experiences = [] }) {
	if (!experiences.length) {
		return (
			<p className="p-6 opacity-60 text-sm">
				Experience will appear here once it is added in the admin dashboard.
			</p>
		);
	}

	return (
		<div className="relative p-5 sm:p-8 overflow-hidden">
			<div className="absolute right-0 top-0 w-40 h-full opacity-70 pointer-events-none hidden lg:block">
				<Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
					<FloatingNodes />
				</Canvas>
			</div>
			<ul className="relative space-y-7 ml-3 border-l-2 border-accent2/60">
				{experiences.map((item, index) => (
					<ExperienceCard key={`${item.title}-${index}`} item={item} index={index} />
				))}
			</ul>
		</div>
	);
}

export default ExperienceTimeline;
