import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

function MyCreations() {
	const [projects, setProjects] = useState([]);
	useEffect(() => {
		//fetch from server
	}, []);
	return (
		<div className="realtive shadow-2xl overflow-hidden p-4 sm:w-11/12 h-full flex flex-col gap-2 items-center justify-center mx-auto ">
			<div className="text-center mb-12">
				<h1 className="text-5xl font-bold mb-6">
					My <span className="text-[#A7DBDC]">Creations</span>
				</h1>
				<p>
					A selection of projects where I've turned ideas into reality,
					showcasing my skills in <br /> development and problem-solving.
				</p>
			</div>
			<div className="h-[32rem] min-w-[400px] drop-shadow-2xl overflow-hidden gap-7 flex justify-center items-center rounded-lg w-5/6 bg-gray-700/80">
				<button>{"<"}-</button>
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
				<button>-{">"}</button>
			</div>
		</div>
	);
}

export default MyCreations;
