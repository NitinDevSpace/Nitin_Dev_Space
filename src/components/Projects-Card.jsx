import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StatusChip from "./StatusChip";
import { getProjectOverview } from "../utils/text";

function ProjectCard({ selectedProject }) {
	const navigate = useNavigate();
	const overview = getProjectOverview(selectedProject, 72);
	const stack = Array.isArray(selectedProject?.techStack)
		? selectedProject.techStack
		: [];
	const cover =
		selectedProject?.image ||
		(Array.isArray(selectedProject?.crousel) && selectedProject.crousel[0]) ||
		"";

	return (
		<motion.button
			type="button"
			layoutId={`card-${selectedProject._id}`}
			onClick={() => navigate(`/projects/${selectedProject._id}`)}
			whileHover={{ y: -6 }}
			className="group relative w-full aspect-square text-left bg-primary2 border border-white/10 rounded-xl overflow-hidden hover:border-accent2/50 hover:shadow-[0_0_24px_rgba(225,182,102,0.18)] transition-colors"
		>
			<img
				src={cover}
				alt={selectedProject.title}
				className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />
			<StatusChip status={selectedProject.status} />
			<div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-2">
				<h2 className="text-base font-semibold leading-tight line-clamp-2">
					{selectedProject.title}
				</h2>
				<p className="text-xs font-light opacity-70 line-clamp-2">{overview}</p>
				<div className="flex flex-wrap gap-1.5">
					{stack.slice(0, 2).map((tech) => (
						<span
							key={tech}
							className="px-2 py-0.5 bg-accent1/20 rounded text-[10px]"
						>
							{tech}
						</span>
					))}
					{stack.length > 2 && (
						<span className="px-2 py-0.5 bg-accent1/20 rounded text-[10px]">
							+{stack.length - 2}
						</span>
					)}
				</div>
			</div>
		</motion.button>
	);
}

export default ProjectCard;
