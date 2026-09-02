import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../services/projects.service";
import ProjectCard from "../../components/Projects-Card";
import { ProjectsGridSkeleton } from "../../components/Loading";
import Footer from "../../components/Footer";

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		async function fetchData() {
			setLoading(true);
			const allProjects = await getAllProjects();
			setProjects(allProjects?.data || []);
			setLoading(false);
		}
		fetchData();
	}, []);

	return (
		<>
			<div>
				<div className="relative pt-20 sm:pt-24 md:pt-28 mb-10 sm:mb-16 flex flex-col items-center justify-center px-4">
					<h1 className="text-3xl sm:text-4xl mb-4 text-center">My Projects</h1>
					<p className="opacity-70 p-2 sm:p-4 text-center max-w-2xl text-sm sm:text-base">
						A compact look at the things I have built. Open any card for the
						full story, images, and details.
					</p>
				</div>

				{loading ? (
					<ProjectsGridSkeleton count={8} />
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-[94%] sm:w-11/12 mx-auto mb-16">
						{projects.map((project) => (
							<ProjectCard key={project._id} selectedProject={project} />
						))}
					</div>
				)}
			</div>
			<Footer />
		</>
	);
};

export default Projects;
