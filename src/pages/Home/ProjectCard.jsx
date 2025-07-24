import { Eye, Layers } from "lucide-react";
import React from "react";

function ProjectCard({ project }) {
	const { title, image, description, status, techStack, liveLink } = project;
	return (
		<div className="relative animate-marquee bg-[#0f3c66] z-10 hover-scale flex flex-col rounded-lg min-w-[370px] overflow-hidden h-[400px] sm:min-w-[420px]">
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
				<div className="overflow-hidden h-1/3">
					<h1 className="text-thin opacity-70 font-sans ">{description}</h1>
				</div>
				<div className="overflow-hidden h-1/3">
					<h1 className="flex pb-1 gap-2">
						<Layers className="text-accent2" />
						Tech Stack
					</h1>
					<div className="flex gap-3 text-sm font-thin font-sans">
						{techStack.map((name, i) => {
							return (
								<p className="bg-accent1/40 px-1 rounded-lg" key={i}>
									{name}
								</p>
							);
						})}
					</div>
				</div>
				<button className="overflow-hidden text-accent2 flex gap-2 self-start h-1/4 pt-2">
					<Eye />
					View Details
				</button>
			</div>
		</div>
	);
}

export default ProjectCard;
