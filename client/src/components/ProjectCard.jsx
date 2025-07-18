import React from "react";

function ProjectCard() {
	return (
        <div className="relative bg-white z-10 flex flex-col rounded-lg min-w-[370px] overflow-hidden h-[450px] w-[420px]">
			<div className="overflow-hidden">
				<img
					className="w-full h-full object-cover z-10"
					src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
					alt=""
				/>
				<div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 to-transparent"></div>
			</div>
			<div className="bg-blue-500 h-1/2"></div>
		</div>
	);
}

export default ProjectCard;
