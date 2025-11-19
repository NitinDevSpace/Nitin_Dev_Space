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
		<div className="bg-primary2 relative flex flex-col rounded-xl h-fit m-4 p-6 shadow-xl border border-white/10">
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
									className="bg-secondary flex gap-4 items-center justify-between rounded-xl p-5 m-4 shadow-lg border border-white/10 hover:shadow-xl hover:border-orange/40 transition-all duration-300"
								>
									<div className="grow text-lg font-semibold tracking-wide text-white">
										{project.title}
									</div>
									<button
										onClick={() => {
											setEditModal(!editModal);
											setModalType("edit");
											setSelectedProject(project);
										}}
										className="p-2 rounded-lg bg-primary2 hover:bg-primary transition-all duration-300 border border-white/10 hover:border-orange/40"
									>
										<Edit className="w-5 h-5" />
									</button>
									<button
										onClick={() => {
											setDeleteModal(!deleteModal);
											setSelectedProject(project);
										}}
										className="p-2 rounded-lg bg-primary2 hover:bg-primary transition-all duration-300 border border-red-400/20 hover:border-red-500/40"
									>
										<Trash2 className="w-5 h-5 text-red-400" />
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
						className="bg-orange text-black font-semibold tracking-wide m-4 rounded-lg p-3 shadow-md hover:shadow-xl hover:bg-orange/90 transition-all duration-300"
					>
						+ Add New Project
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
