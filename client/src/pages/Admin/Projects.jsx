import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProjectsModal from "../../components/Modals/ProjectsModal";

function Projects() {
	const [open, setOpen] = useState(false);
	const [modal, setModal] = useState(false);
	let [projects, setProjects] = useState([]);

	projects = [
		{
			title: "Project Number 1",
			image: "https://placehold.co/800x500",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem accusamus officiis temporibus voluptatibus odio repellendus quibusdam saepe obcaecati architecto enim!",
			status: "Finished",
			stack: ["React", "NextJS", "HTML", "JS", "Tailwind"],
		},
		{
			title: "Project Number 2",
			image: "https://placehold.co/800x500",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem accusamus officiis temporibus voluptatibus odio repellendus quibusdam saepe obcaecati architecto enim!",
			status: "Finished",
			stack: ["React", "NextJS", "HTML", "JS", "Tailwind"],
		},
		{
			title: "Project Number 3",
			image: "https://placehold.co/800x500",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem accusamus officiis temporibus voluptatibus odio repellendus quibusdam saepe obcaecati architecto enim!",
			status: "Finished",
			stack: ["React", "NextJS", "HTML", "JS", "Tailwind"],
		},
		{
			title: "Project Number 4",
			image: "https://placehold.co/800x500",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem accusamus officiis temporibus voluptatibus odio repellendus quibusdam saepe obcaecati architecto enim!",
			status: "Finished",
			stack: ["React", "NextJS", "HTML", "JS", "Tailwind"],
		},
		{
			title: "Project Number 5",
			image: "https://placehold.co/800x500",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem accusamus officiis temporibus voluptatibus odio repellendus quibusdam saepe obcaecati architecto enim!",
			status: "Finished",
			stack: ["React", "NextJS", "HTML", "JS", "Tailwind"],
		},
	];

	useEffect(() => {}, []);

	return (
		<div className="bg-primary2 relative flex flex-col justify-center rounded-lg h-fit m-4 p-4">
			{/* Heading Intro */}
			<div
				onClick={() => {
					setOpen(!open);
				}}
				className="flex"
			>
				<h1 className="pb-2 text-2xl border-b-2">Projects</h1>
			</div>
			{open && (
				<div className="flex flex-col rounded-lg bg-primary mt-4">
					<div>
						<ul className="border">
							{projects.map((project, idx) => {
								return <li key={idx}>{project.title}</li>;
							})}
						</ul>
						<button
							onClick={() => {
								setModal(!modal);
							}}
							className="bg-orange rounded-lg p-2"
						>
							New +
						</button>

						{/* Form & para Collapsible */}
						{modal && (
							<ProjectsModal />
						)}
					</div>
				</div>
			)}

			<button
				onClick={() => {
					setOpen(!open);
				}}
				className="absolute top-4 right-5"
			>
				{open ? <ArrowUp /> : <ArrowDown />}
			</button>
		</div>
	);
}

export default Projects;
