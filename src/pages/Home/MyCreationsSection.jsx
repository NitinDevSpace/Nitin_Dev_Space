import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllProjects } from "../../services/projects.service";
import { useNavigate } from "react-router-dom";

function MyCreations() {
	const scrollRef = useRef(null);
	const navigate = useNavigate();

	const [projects, setProjects] = useState([]);

	const getData = async () => {
		const allProjects = await getAllProjects();
		setProjects(allProjects.data);
	};

	useEffect(() => {
		getData();
	}, []);

	const scrollLeft = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({
				left: -450,
				behavior: "smooth",
			});
		}
	};
	const scrollRight = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({
				left: 450,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className="relative my-4 overflow-hidden p-4 sm:w-11/12 h-screen flex flex-col gap-2 items-center justify-center mx-auto ">
			<div className="text-center mb-12">
				<h1 className="text-5xl font-bold mb-6">
					My <span className="text-[#A7DBDC]">Creations</span>
				</h1>
				<p>
					A selection of projects where I've turned ideas into reality,
					showcasing my skills in <br /> development and problem-solving.
				</p>
			</div>
			<div className="h-[32rem]  min-w-[400px] overflow-hidden drop-shadow-2xl gap-7 flex justify-center items-center rounded-lg w-5/6 bg-primary3">
				<button
					onClick={scrollLeft}
					className="absolute left-0 z-20 opacity-20 py-60 px-6 hover-scale hover:bg-black/40 hover:opacity-100 shadow-2xl"
				>
					{" "}
					<ArrowLeft className="scale-150" />{" "}
				</button>
				<div
					ref={scrollRef}
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
					className="h-full  drop-shadow-2xl overflow-x-scroll gap-7 flex justify-start px-12 items-center rounded-lg w-full scroll-smooth"
				>
					{projects.map((project, i) => {
						return (
							<div className={`transition-transform duration-300`} key={i}>
								<ProjectCard className="z-10" project={project} />
							</div>
						);
					})}
				</div>
				<button
					onClick={scrollRight}
					className="absolute right-0 z-20 opacity-20 py-60 px-6 hover-scale hover:bg-black/40 hover:opacity-100 shadow-2xl"
				>
					<ArrowRight className="scale-150" />
				</button>
			</div>
			<button
				onClick={() => {
					navigate("/projects");
				}}
				className="rounded-lg flex p-4 text-black mt-5 bg-accent2"
			>
				See All My Projects <ArrowRight className="animate-bounce-x" />
			</button>
		</div>
	);
}

export default MyCreations;
