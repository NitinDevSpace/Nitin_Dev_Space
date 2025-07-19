import React from "react";

function ProjectCard() {
	return (
		<div className="relative bg-white z-10 hover-scale flex flex-col rounded-lg min-w-[370px] overflow-hidden h-[400px] w-[420px]">
			<div className="relative overflow-hidden h-3/5">
				<img
					className="w-full h-full object-cover z-10"
					src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
					alt=""
				/>
				<div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 to-transparent h-full "></div>
				<h1 className="z-30 text-xl absolute py-4 px-6 bottom-0">
					Project Name
				</h1>
				<span className="absolute top-2 right-3 px-4 rounded-full bg-primary">
					{" "}
					Finished
				</span>
			</div>
			<div className="bg-gray-500 flex gap-1 flex-col pt-2 px-4 h-2/5">
				<div className="overflow-hidden h-1/3">
					<h1 className="text-thin opacity-70 font-sans ">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
						ducimus provident voluptatem itaque blanditiis molestias aliquid
						molestiae ipsum natus aliquam?
					</h1>
				</div>
				<div className="overflow-hidden h-1/3">
					<h1>Tech Stack</h1>
					<div className="flex gap-3 text-sm font-thin font-sans">
						<p className="bg-accent2/40 px-1 rounded-lg" >React</p>
						<p className="bg-accent2/40 px-1 rounded-lg" >NextJS</p>
						<p className="bg-accent2/40 px-1 rounded-lg" >HTML</p>
						<p className="bg-accent2/40 px-1 rounded-lg" >JS</p>
						<p className="bg-accent2/40 px-1 rounded-lg" >Tailwind</p>
					</div>
				</div>
				<button className="overflow-hidden self-start h-1/3">
					View Details
				</button>
			</div>
		</div>
	);
}

export default ProjectCard;
