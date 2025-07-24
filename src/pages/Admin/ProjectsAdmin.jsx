import { ArrowDown, ArrowUp, Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProjectsModal from "../../components/Modals/ProjectsModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import { getAllProjects } from "../../services/projects.service";

function Projects() {
	const [open, setOpen] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [modalType, setModalType] = useState("");
	const [selectedProject, setSelectedProject] = useState(null);
	const [projects, setProjects] = useState(() => []);

	const getData = async () => {
		const allProjects = await getAllProjects();
		setProjects(allProjects.data);
	};

	useEffect(() => {
		getData();
	}, []);

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
					<ul className="">
						{projects.map((project) => {
							return (
								<li
									key={project._id}
									className="bg-secondary gap-4 flex rounded-lg p-4 m-4"
								>
									<div className="grow">{project.title}</div>
									<button
										onClick={() => {
											setEditModal(!editModal);
											setModalType("edit");
											setSelectedProject(project._id);
										}}
									>
										<Edit />
									</button>
									<button
										onClick={() => {
											setDeleteModal(!deleteModal);
											setSelectedProject(project._id);
										}}
									>
										<Trash2 className="text-red-400" />
									</button>
								</li>
							);
						})}
					</ul>
					<button
						onClick={() => {
							setEditModal(!editModal);
							setModalType("new");
						}}
						className="bg-orange m-4 rounded-lg p-2"
					>
						New +
					</button>

					{/* Form & para Collapsible */}
					{editModal && (
						<ProjectsModal
							modalType={modalType}
							setModalType={setModalType}
							selectedProject={selectedProject}
							setSelectedProject={setSelectedProject}
							getData={getData}
							onClose={() => setEditModal(false)}
						/>
					)}
					{deleteModal && (
						<DeleteModal
							selectedProject={selectedProject}
							setSelectedProject={setSelectedProject}
							getData={getData}
							onClose={() => setDeleteModal(false)}
						/>
					)}
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
