import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function ProjectDetails({ selectedProject, setSelectedProject }) {
	const openNewWindow = (url) => {
		const newWindow = window.open(url, "_blank", "noopener, noreferrer");
		if (newWindow) newWindow.focus();
	};

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
				onClick={() => setSelectedProject(null)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
			>
				<motion.div
					layoutId={`card-${selectedProject._id}`}
					onClick={(e) => e.stopPropagation()}
					className="bg-white text-black p-6 rounded-lg w-[90%] max-w-xl"
					exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeInOut" } }}
				>
					<img
						src={selectedProject.image}
						alt="Project"
						className="mb-4 w-full rounded"
					/>
					<h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
					<div className="mb-4 max-h-40 overflow-y-auto overscroll-contain allow-scroll">
						<p
							dangerouslySetInnerHTML={{ __html: selectedProject.description }}
							className="text-sm leading-relaxed"
						/>
					</div>
					<div className="flex flex-wrap gap-2 mb-4">
						{selectedProject.techStack.map((tech, i) => (
							<span key={i} className="px-2 py-1 bg-gray-200 rounded text-sm">
								{tech}
							</span>
						))}
					</div>
					<button
						onClick={() => {
							openNewWindow(selectedProject.liveLink);
						}}
						className="px-4 py-2 m-2 rounded bg-red-500 text-white"
					>
						Live
					</button>
					<button
						onClick={() => setSelectedProject(null)}
						className="mt-2 px-4 py-2 rounded bg-red-500 text-white"
					>
						Close
					</button>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}

export default ProjectDetails;
