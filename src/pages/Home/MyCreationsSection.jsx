import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllProjects } from "../../services/projects.service";
import { useNavigate } from "react-router-dom";
import ProjectDetails from "../../components/Modals/ProjectDetails";
import Loading from "../../components/Loading";

function MyCreations() {
	const scrollRef = useRef(null);
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [projects, setProjects] = useState([]);
	const [selectedProject, setSelectedProject] = useState(null);

	const getData = async () => {
		setLoading(true);
		const allProjects = await getAllProjects();
		setProjects(allProjects.data);
		setLoading(false);
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
		<div className="relative pt-24 overflow-hidden p-4 sm:w-11/12 h-screen flex flex-col gap-2 items-center justify-center mx-auto ">
			{/* Heading */}
			<div className="text-center mb-12">
				<h1 className="text-5xl font-bold mb-6">
					My <span className="text-accent2">Creations</span>
				</h1>
				<p>
					A selection of projects where I've turned ideas into reality,
					showcasing my skills in <br /> development and problem-solving.
				</p>
			</div>
			{/* Crousel */}
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
					{loading ? (
						<div className="relative gap-5 z-10 flex rounded-lg overflow-hidden h-[440px] hover:cursor-pointer">
							<Loading />
							<Loading />
							<Loading />
						</div>
					) : (
						projects.map((project, i) => {
							return (
								<div className={`transition-transform duration-300`} key={i}>
									<ProjectCard
										className="z-10"
										project={project}
										onClick={() => {
											setSelectedProject(project);
										}}
									/>
								</div>
							);
						})
					)}
				</div>
				<button
					onClick={scrollRight}
					className="absolute right-0 z-20 opacity-20 py-60 px-6 hover-scale hover:bg-black/40 hover:opacity-100 shadow-2xl"
				>
					<ArrowRight className="scale-150" />
				</button>
			</div>
			{/* Button */}
			<button
				onClick={() => {
					navigate("/projects");
				}}
				className="rounded-lg flex p-4 text-black mt-5 hover-scale bg-accent2"
			>
				See All My Projects <ArrowRight className="animate-bounce-x" />
			</button>
			{/* Project Details Modal */}
			{selectedProject && (
				<ProjectDetails
					selectedProject={selectedProject}
					setSelectedProject={setSelectedProject}
				/>
			)}
		</div>
	);
}

export default MyCreations;
