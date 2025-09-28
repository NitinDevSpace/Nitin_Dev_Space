import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CompassIcon, Github, X } from "lucide-react";

function ProjectDetails({ selectedProject }) {
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		if (!selectedProject?.crousel?.length) return;

		const interval = setInterval(() => {
			setCurrentImage(
				(prevIndex) => (prevIndex + 1) % selectedProject.crousel.length
			);
		}, 5000);
		return () => clearInterval(interval);
	}, [selectedProject]);

	const openNewWindow = (url) => {
		const newWindow = window.open(url, "_blank", "noopener, noreferrer");
		if (newWindow) newWindow.focus();
	};

	return (
		<AnimatePresence>
			<motion.div
				layoutId={`card-${selectedProject._id}`}
				onClick={(e) => e.stopPropagation()}
				className="relative bg-secondary text-white p-6 rounded-lg max-w-[40%]"
				exit={{
					opacity: 0,
					scale: 0.95,
					transition: { type: "spring", duration: 0.2, ease: "easeInOut" },
				}}
			>
				{/* Status */}
				<span className="absolute top-2 right-3 px-4 text-white rounded-full bg-pink/90 z-50">
					{selectedProject.status}
				</span>
				{/* Crousel Images */}

				<div className="relative mb-4 w-full overflow-hidden rounded">
					<img
						src={selectedProject.crousel[currentImage]}
						alt={`Slide ${currentImage + 1}`}
						className="w-full h-64 object-cover transition duration-700 ease-in-out"
					/>
					{/* Dots */}
					<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
						{selectedProject.crousel.map((_, index) => (
							<span
								key={index}
								className={`w-2 h-2 rounded-full ${
									index === currentImage ? "bg-white" : "bg-white/40"
								}`}
							/>
						))}
					</div>
				</div>
				{/* Links */}
				<div className="absolute right-5 flex gap-4 justify-end">
					<div className="relative group">
						<div
							onClick={() => {
								openNewWindow(selectedProject.github);
							}}
							className="bg-blue/60 p-2 w-10 text-white rounded-full cursor-pointer"
						>
							<Github />
						</div>
						<span className="absolute mt-2 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-80 transition duration-200 whitespace-nowrap pointer-events-none z-50">
							GitHub Repo
						</span>
					</div>
					<div className="relative group">
						<div
							onClick={() => {
								openNewWindow(selectedProject.liveLink);
							}}
							className="bg-blue/60 p-2 w-10 text-white rounded-full cursor-pointer"
						>
							<CompassIcon />
						</div>
						<span className="absolute mt-2 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-80 transition duration-200 whitespace-nowrap pointer-events-none z-50">
							Live Site
						</span>
					</div>
				</div>
				{/* Title */}
				<h2 className="text-2xl w-3/4 font-bold mb-4">
					{selectedProject.title}
				</h2>
				{/* Description */}
				<span className="text-lg font-semibold">Description:</span>
				<div className="mb-4 max-h-40 overflow-y-auto overscroll-contain allow-scroll">
					<p
						dangerouslySetInnerHTML={{ __html: selectedProject.description }}
						className="text-sm leading-relaxed"
					/>
				</div>
				{/* Tech Stack */}
				<span className="text-lg font-semibold">Tech Stack:</span>
				<div className="flex flex-wrap gap-2 mb-4">
					{selectedProject.techStack.map((tech, i) => (
						<span key={i} className="px-2 py-1 bg-blue/20 rounded text-sm">
							{tech}
						</span>
					))}
				</div>
			</motion.div>
		</AnimatePresence>
	);
}

export default ProjectDetails;
