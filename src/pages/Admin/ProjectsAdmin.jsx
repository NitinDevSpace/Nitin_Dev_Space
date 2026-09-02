import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProjectsModal from "../../components/Modals/ProjectsModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import { getAllProjects } from "../../services/projects.service";
import { getProjectOverview, sortNewestFirst } from "../../utils/text";

function Projects() {
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [detailModal, setDetailModal] = useState(false);
	const [modalType, setModalType] = useState("");
	const [selectedProject, setSelectedProject] = useState(null);
	const [projects, setProjects] = useState([]);

	const getData = async () => {
		const allProjects = await getAllProjects();
		setProjects(sortNewestFirst(allProjects?.data || []));
	};

	useEffect(() => {
		getData();
	}, []);

	const coverOf = (project) =>
		project.image ||
		(Array.isArray(project.crousel) && project.crousel[0]) ||
		"";

	return (
		<div className="space-y-5">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<h2 className="text-2xl font-semibold">Projects</h2>
					<p className="text-sm opacity-60 mt-1">
						Cards power /projects, My Creations, and key projects on Profile.
						Click a card for details.
					</p>
				</div>
				<button
					type="button"
					onClick={() => {
						setSelectedProject({
							isKeyProject: false,
							techStack: [],
							crousel: "",
						});
						setModalType("new");
						setEditModal(true);
					}}
					className="inline-flex items-center gap-2 bg-accent2 text-black font-semibold rounded-lg px-4 py-2.5"
				>
					<Plus size={16} /> Add project
				</button>
			</div>

			{projects.length === 0 ? (
				<div className="rounded-xl border border-dashed border-white/15 bg-primary2/40 py-16 text-center text-sm opacity-50">
					No projects yet. Add your first one.
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
					{projects.map((project) => {
						const cover = coverOf(project);
						return (
							<button
								key={project._id}
								type="button"
								onClick={() => {
									setSelectedProject(project);
									setDetailModal(true);
								}}
								className="group text-left rounded-2xl border border-white/10 bg-primary2/70 overflow-hidden hover:border-accent2/40 hover:shadow-[0_0_28px_rgba(225,182,102,0.12)] transition-all"
							>
								<div className="relative aspect-[16/10] bg-primary overflow-hidden">
									{cover ? (
										<img
											src={cover}
											alt={project.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
									) : (
										<div className="w-full h-full bg-white/5" />
									)}
									<div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
									{project.status && (
										<span className="absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full bg-primary/80 border border-white/15 backdrop-blur">
											{project.status}
										</span>
									)}
									{project.isKeyProject && (
										<span className="absolute top-3 left-3 text-[10px] px-2.5 py-1 rounded-full bg-accent2/90 text-black font-semibold">
											Key
										</span>
									)}
								</div>
								<div className="p-4 space-y-2">
									<h3 className="font-semibold line-clamp-1">{project.title}</h3>
									<p className="text-xs text-white/55 line-clamp-2">
										{getProjectOverview(project, 100) || "No overview yet"}
									</p>
									<div className="flex flex-wrap gap-1.5 pt-1">
										{(project.techStack || []).slice(0, 3).map((tech) => (
											<span
												key={tech}
												className="px-2 py-0.5 rounded-full bg-accent1/15 text-[10px] text-accent1"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</button>
						);
					})}
				</div>
			)}

			{detailModal && selectedProject && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
					onClick={() => setDetailModal(false)}
				>
					<div
						className="w-full max-w-lg bg-primary2 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="relative aspect-[16/9] bg-primary">
							{coverOf(selectedProject) ? (
								<img
									src={coverOf(selectedProject)}
									alt={selectedProject.title}
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full bg-white/5" />
							)}
						</div>
						<div className="p-5 space-y-3">
							<div className="flex flex-wrap gap-2">
								{selectedProject.status && (
									<span className="text-[11px] px-2.5 py-1 rounded-full bg-white/10">
										{selectedProject.status}
									</span>
								)}
								{selectedProject.isKeyProject && (
									<span className="text-[11px] px-2.5 py-1 rounded-full bg-accent2/20 text-accent2">
										Key project
									</span>
								)}
							</div>
							<h3 className="text-xl font-semibold">{selectedProject.title}</h3>
							<p className="text-sm text-white/65 leading-relaxed">
								{getProjectOverview(selectedProject, 280) ||
									"No overview written yet."}
							</p>
							{(selectedProject.techStack || []).length > 0 && (
								<p className="text-xs text-white/45">
									{(selectedProject.techStack || []).join(" · ")}
								</p>
							)}
							<div className="flex flex-wrap gap-2 pt-2">
								<button
									type="button"
									onClick={() => {
										setDetailModal(false);
										setModalType("edit");
										setEditModal(true);
									}}
									className="inline-flex items-center gap-2 bg-accent2 text-black font-semibold px-4 py-2 rounded-lg text-sm"
								>
									<Edit size={14} /> Edit
								</button>
								<button
									type="button"
									onClick={() => {
										setDetailModal(false);
										setDeleteModal(true);
									}}
									className="inline-flex items-center gap-2 border border-red-400/30 text-red-300 px-4 py-2 rounded-lg text-sm"
								>
									<Trash2 size={14} /> Delete
								</button>
								<button
									type="button"
									onClick={() => setDetailModal(false)}
									className="ml-auto text-sm opacity-60 hover:opacity-100 px-3"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

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
	);
}

export default Projects;
