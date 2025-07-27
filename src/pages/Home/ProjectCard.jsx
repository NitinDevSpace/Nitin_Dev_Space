import { Eye, Layers } from "lucide-react";
import React, { useState } from "react";

function ProjectCard({ project }) {
	const { title, image, description, status, techStack } = project;
	const [open, setOpen] = useState(false);

	return (
		<div
			onClick={() => {
				setOpen(!open);
			}}
			className="relative bg-[#0f3c66] z-10 hover-scale flex flex-col rounded-lg min-w-[370px] overflow-hidden h-[440px] sm:min-w-[435px] hover:cursor-pointer"
		>
			<div className="relative overflow-hidden h-3/5">
				<img
					className="w-full h-full object-cover z-10"
					src={image}
					alt="Project Image"
				/>
				<div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 to-transparent h-full "></div>
				<h1 className="z-30 text-xl absolute py-4 px-6 bottom-0">{title}</h1>
				<span className="absolute top-2 right-3 px-4 rounded-full bg-pink">
					{" "}
					{status}
				</span>
			</div>
			<div className=" flex gap-1 flex-col pt-2 px-4 h-2/5">
				<div className="overflow-hidden h-[53px]">
					<h1 className="text-thin opacity-70 font-sans ">{description}</h1>
				</div>
				<div className="overflow-hidden h-1/3">
					<h1 className="flex pb-1 gap-2">
						<Layers className="text-accent2" />
						Tech Stack
					</h1>
					<div className="flex flex-wrap gap-3 text-sm font-thin font-sans">
						{techStack.slice(0, 4).map((tech, index) => (
							<span
								key={index}
								className="px-2 py-1 bg-accent1/40 rounded text-sm"
							>
								{tech}
							</span>
						))}
						{project.techStack.length > 4 && (
							<span className="px-2 py-1 bg-accent1/40 rounded text-sm">
								+{project.techStack.length - 4}
							</span>
						)}
					</div>
				</div>
				<button className="overflow-hidden text-accent2 flex gap-2 self-start h-1/4 pt-2 hover:underline underline-offset-4">
					<Eye />
					View Details
				</button>
			</div>
			{open && <div className="fixed h-80 bg-black w-80">
			
			</div>}
		</div>
	);
}

export default ProjectCard;
