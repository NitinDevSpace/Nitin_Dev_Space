import React from "react";
import { addProject, updateProject } from "../../services/projects.service";

function ProjectsModal({
	modalType,
	setModalType,
	selectedProject,
	setSelectedProject,
	getData,
	onClose,
}) {
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = new FormData(e.target);
			const payload = {
				title: data.get("title"),
				image: data.get("image"),
				description: data.get("description"),
				status: data.get("status"),
				techStack: data.get("techStack").split(",").map((item) => item.trim()),
				crousel: data.get("crousel").split(",").map((item) => item.trim()),
				liveLink: data.get("liveLink"),
				github: data.get("github"),
			};
			if (modalType === "new") {
				const res = await addProject(payload);
				if (res) {
					console.log(res.message);
					getData();
					setModalType("");
					setSelectedProject(null);
					onClose();
				}
			} else {
				const res = await updateProject(selectedProject._id, payload);
				if (res) {
					console.log(res.message);
					getData();
					setModalType("");
					setSelectedProject(null);
					onClose();
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleCancel = () => {
		setSelectedProject(null);
		onClose();
		setModalType("");
	};

	return (
		<div
			className="fixed inset-0  overflow-y-auto bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
			onClick={handleCancel}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="fixed overflow-y-auto bottom-4  top-12 left-1/2 transform -translate-x-1/2 w-1/2 py-6 px-12 bg-white/90 text-black rounded-lg shadow-lg"
			>
				<h1 className="bg-blue p-2 text-white rounded-lg">
					{modalType === "new" ? "Add New Proejct" : "Update Your Project"}
				</h1>

				<form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label htmlFor="title" className="text-xl">
							Title:
						</label>
						<input
							type="text"
							name="title"
							id="title"
							className="p-2 rounded m-2"
							placeholder="Enter project title"
							value={selectedProject?.title || ""}
							onChange={(e) =>
								setSelectedProject((prev) => ({
									...prev,
									title: e.target.value,
								}))
							}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="image" className="text-xl">
							Image URL:
						</label>
						<input
							type="text"
							name="image"
							id="image"
							className="p-2 rounded m-2"
							placeholder="Enter image URL"
							value={selectedProject?.image || ""}
							onChange={(e) =>
								setSelectedProject((prev) => ({
									...prev,
									image: e.target.value,
								}))
							}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="crousel" className="text-xl">
							Crousel:
						</label>
						<textarea
							type="text"
							name="crousel"
							id="crousel"
							rows="4"
							className="p-2 rounded m-2"
							placeholder="Enter crousel URL's seprated by comma"
							value={selectedProject?.crousel || ""}
							onChange={(e) =>
								setSelectedProject((prev) => ({
									...prev,
									crousel: e.target.value,
								}))
							}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="description" className="text-xl">
							Description:
						</label>
						<textarea
							name="description"
							id="description"
							rows="4"
							className="p-2 rounded m-2"
							placeholder="Enter project description"
							value={selectedProject?.description || ""}
							onChange={(e) =>
								setSelectedProject((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="status" className="text-xl">
							Status:
						</label>
						<select
							name="status"
							id="status"
							className="p-2 rounded m-2"
							value={selectedProject?.status || ""}
							onChange={(e) =>
								setSelectedProject((prev) => ({
									...prev,
									status: e.target.value,
								}))
							}
						>
							<option value="">Select status</option>
							<option value="In Progress">In Progress</option>
							<option value="Finished">Finished</option>
							<option value="Planned">Planned</option>
							<option value="On Hold">On Hold</option>
						</select>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="techStack" className="text-xl">
							Tech Stack (comma separated):
						</label>
						<input
							type="text"
							name="techStack"
							id="techStack"
							className="p-2 rounded m-2"
							placeholder="e.g. React, Node.js"
							value={selectedProject?.techStack?.join(", ") || ""}
							onChange={(e) =>
								setSelectedProject((prev) => ({
									...prev,
									techStack: e.target.value
										.split(",")
										.map((tech) => tech.trim()),
								}))
							}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="github" className="text-xl">
							Github Link:
						</label>
						<input
							type="text"
							name="github"
							id="github"
							className="p-2 rounded m-2"
							placeholder="Enter project Github URL"
							value={selectedProject?.github || ""}
							onChange={(e) =>
								setSelectedProject((prev) => ({
									...prev,
									github: e.target.value,
								}))
							}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="liveLink" className="text-xl">
							Live Link:
						</label>
						<input
							type="text"
							name="liveLink"
							id="liveLink"
							className="p-2 rounded m-2"
							placeholder="Enter live project URL"
							value={selectedProject?.liveLink || ""}
							onChange={(e) =>
								setSelectedProject((prev) => ({
									...prev,
									liveLink: e.target.value,
								}))
							}
						/>
					</div>

					<button
						type="submit"
						className="p-2 bg-blue text-white rounded-lg mt-4 justify-center justify-self-center flex"
					>
						{modalType === "new" ? "Add Project" : "Update Project"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default ProjectsModal;
