import React, { useState } from "react";
import { addProject, updateProject } from "../../services/projects.service";
import { Eye, Save, X } from "lucide-react";
import { getProjectOverview } from "../../utils/text";

function ProjectsModal({
	modalType,
	setModalType,
	selectedProject,
	setSelectedProject,
	getData,
	onClose,
}) {
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	const setField = (key, value) =>
		setSelectedProject((prev) => ({ ...(prev || {}), [key]: value }));

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		setError("");
		try {
			const payload = {
				title: selectedProject?.title || "",
				image: selectedProject?.image || "",
				overview: selectedProject?.overview || "",
				description: selectedProject?.description || "",
				status: selectedProject?.status || "",
				techStack: Array.isArray(selectedProject?.techStack)
					? selectedProject.techStack.filter(Boolean)
					: String(selectedProject?.techStack || "")
							.split(",")
							.map((t) => t.trim())
							.filter(Boolean),
				crousel: Array.isArray(selectedProject?.crousel)
					? selectedProject.crousel.filter(Boolean)
					: String(selectedProject?.crousel || "")
							.split(",")
							.map((t) => t.trim())
							.filter(Boolean),
				liveLink: selectedProject?.liveLink || "",
				github: selectedProject?.github || "",
				isKeyProject: Boolean(selectedProject?.isKeyProject),
			};

			let res;
			if (modalType === "new") {
				res = await addProject(payload);
			} else {
				res = await updateProject(selectedProject._id, payload);
			}

			if (!res?.success) {
				throw new Error(res?.message || "Save failed");
			}
			await getData();
			setModalType("");
			setSelectedProject(null);
			onClose();
		} catch (err) {
			setError(err?.message || "Could not save project");
		} finally {
			setSaving(false);
		}
	};

	const handleCancel = () => {
		setSelectedProject(null);
		onClose();
		setModalType("");
	};

	const preview = selectedProject || {};
	const cover =
		preview.image ||
		(Array.isArray(preview.crousel) && preview.crousel[0]) ||
		"";

	return (
		<div
			className="fixed inset-0 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 py-10 px-4"
			onClick={handleCancel}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="w-full max-w-5xl bg-primary2 border border-white/10 text-white rounded-2xl shadow-2xl overflow-hidden"
			>
				<div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
					<div>
						<h1 className="text-xl font-semibold">
							{modalType === "new" ? "Add project" : "Update project"}
						</h1>
						<p className="text-xs opacity-50 mt-1">
							Card preview updates as you type · full details show on the
							project page
						</p>
					</div>
					<button
						onClick={handleCancel}
						className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
					>
						<X size={18} />
					</button>
				</div>

				<div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0">
					<form onSubmit={handleSubmit} className="p-6 space-y-4 border-r border-white/10">
						<div className="grid sm:grid-cols-2 gap-4">
							<label className="flex flex-col gap-1 text-sm sm:col-span-2">
								Title
								<input
									required
									className="admin-field"
									value={preview.title || ""}
									onChange={(e) => setField("title", e.target.value)}
								/>
							</label>
							<label className="flex flex-col gap-1 text-sm sm:col-span-2">
								Cover image URL
								<input
									className="admin-field"
									value={preview.image || ""}
									onChange={(e) => setField("image", e.target.value)}
								/>
							</label>
							<label className="flex flex-col gap-1 text-sm sm:col-span-2">
								Carousel image URLs (comma separated)
								<textarea
									rows="2"
									className="admin-field"
									value={
										Array.isArray(preview.crousel)
											? preview.crousel.join(", ")
											: preview.crousel || ""
									}
									onChange={(e) =>
										setField(
											"crousel",
											e.target.value.split(",").map((s) => s.trim())
										)
									}
								/>
							</label>
							<label className="flex flex-col gap-1 text-sm sm:col-span-2">
								Short overview (cards / listings)
								<textarea
									rows="2"
									className="admin-field"
									placeholder="1–2 sentences"
									value={preview.overview || ""}
									onChange={(e) => setField("overview", e.target.value)}
								/>
							</label>
							<label className="flex flex-col gap-1 text-sm sm:col-span-2">
								Full description (project page, HTML ok)
								<textarea
									rows="5"
									className="admin-field"
									value={preview.description || ""}
									onChange={(e) => setField("description", e.target.value)}
								/>
							</label>
							<label className="flex flex-col gap-1 text-sm">
								Status
								<select
									className="admin-field"
									value={preview.status || ""}
									onChange={(e) => setField("status", e.target.value)}
								>
									<option value="">Select status</option>
									<option value="In Progress">In Progress</option>
									<option value="Completed">Completed</option>
									<option value="Planned">Planned</option>
									<option value="On Hold">On Hold</option>
								</select>
							</label>
							<label className="flex flex-col gap-1 text-sm">
								Tech stack (comma separated)
								<input
									className="admin-field"
									value={
										Array.isArray(preview.techStack)
											? preview.techStack.join(", ")
											: preview.techStack || ""
									}
									onChange={(e) =>
										setField(
											"techStack",
											e.target.value.split(",").map((t) => t.trim())
										)
									}
								/>
							</label>
							<label className="flex flex-col gap-1 text-sm">
								GitHub
								<input
									className="admin-field"
									value={preview.github || ""}
									onChange={(e) => setField("github", e.target.value)}
								/>
							</label>
							<label className="flex flex-col gap-1 text-sm">
								Live link
								<input
									className="admin-field"
									value={preview.liveLink || ""}
									onChange={(e) => setField("liveLink", e.target.value)}
								/>
							</label>
						</div>

						<label className="flex items-center gap-3 p-3 rounded-lg bg-accent2/10 border border-accent2/30">
							<input
								type="checkbox"
								checked={Boolean(preview.isKeyProject)}
								onChange={(e) => setField("isKeyProject", e.target.checked)}
							/>
							<span className="text-sm">
								Key project — appears on the Profile page
							</span>
						</label>

						{error && <p className="text-red-400 text-sm">{error}</p>}

						<button
							type="submit"
							disabled={saving}
							className="inline-flex items-center gap-2 bg-accent2 text-black font-semibold px-5 py-2.5 rounded-lg"
						>
							<Save size={16} />
							{saving
								? "Saving..."
								: modalType === "new"
									? "Add project"
									: "Update project"}
						</button>
					</form>

					<div className="p-6 bg-primary/40">
						<p className="text-xs uppercase tracking-[0.2em] text-accent2 mb-4 flex items-center gap-2">
							<Eye size={14} /> Card preview · /projects & My Creations
						</p>
						<div className="max-w-sm mx-auto aspect-square relative rounded-xl overflow-hidden border border-white/15 bg-primary2">
							{cover ? (
								<img
									src={cover}
									alt={preview.title || "Preview"}
									className="absolute inset-0 w-full h-full object-cover"
								/>
							) : (
								<div className="absolute inset-0 bg-white/5" />
							)}
							<div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />
							{preview.status && (
								<span className="absolute top-3 right-3 text-xs px-3 py-1 rounded bg-blue-500">
									{preview.status}
								</span>
							)}
							<div className="absolute bottom-0 inset-x-0 p-4 space-y-2">
								<h3 className="font-semibold line-clamp-2">
									{preview.title || "Project title"}
								</h3>
								<p className="text-xs opacity-70 line-clamp-2">
									{getProjectOverview(preview, 80) ||
										"Short overview appears here"}
								</p>
								<div className="flex flex-wrap gap-1.5">
									{(preview.techStack || []).slice(0, 2).map((tech) => (
										<span
											key={tech}
											className="px-2 py-0.5 bg-accent1/20 rounded text-[10px]"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</div>
						<p className="text-xs opacity-50 mt-4 text-center">
							Full description + carousel become the cover on the dedicated
							project page after save.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProjectsModal;
