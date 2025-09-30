import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../services/projects.service";
import ProjectDetails from "../../components/Projects-Card";
import Loading from "../../components/Loading";

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const allProjects = await getAllProjects();
			setProjects(allProjects.data);
			setLoading(false);
		}
		fetchData();
	}, []);

	return (
		<>
			<div>
				<div className="relative my-44 flex flex-col items-center justify-center">
					<h1 className="text-4xl mb-4">My Projects</h1>
					<p className="opacity-70">
						All the things I have built till date, some of them being improved
						even today!
					</p>
				</div>

				{loading ? (
					<div className="flex flex-wrap justify-center items-center gap-8">
						<Loading />
						<Loading />
						<Loading />
						<Loading />
					</div>
				) : (
					<div className="flex flex-wrap gap-12 w-11/12 mx-auto items-center justify-center">
						{projects.map((project, i) => {
							return <ProjectDetails key={i} selectedProject={project} />;
						})}
					</div>
				)}
			</div>
		</>
	);
};

export default Projects;
