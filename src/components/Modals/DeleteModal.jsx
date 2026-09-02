import React, { useState } from "react";
import { deleteProject } from "../../services/projects.service";

function DeleteModal({
	selectedProject,
	getData,
	setSelectedProject,
	onClose,
	onConfirm,
	label,
}) {
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");

	const handleDelete = async () => {
		setBusy(true);
		setError("");
		try {
			let res;
			if (onConfirm) {
				res = await onConfirm();
			} else {
				if (!selectedProject?._id) {
					throw new Error("Missing project id");
				}
				res = await deleteProject(selectedProject._id);
			}
			if (res && res.success === false) {
				throw new Error(res.message || "Delete failed");
			}
			setSelectedProject(null);
			await getData();
			onClose();
		} catch (err) {
			console.error(err);
			setError(err?.message || "Could not delete. Please try again.");
		} finally {
			setBusy(false);
		}
	};

	const handleCancel = () => {
		if (busy) return;
		setSelectedProject(null);
		onClose();
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
			onClick={handleCancel}
		>
			<div
				className="flex flex-col items-center p-6 bg-primary2 text-white rounded-xl shadow-lg max-w-md border border-white/10"
				onClick={(e) => e.stopPropagation()}
			>
				<h1 className="text-center text-lg font-semibold">
					{label || "Are you sure you want to delete this project?"}
				</h1>
				{error && (
					<p className="text-red-400 text-sm mt-3 text-center">{error}</p>
				)}
				<div className="flex gap-3 mt-6">
					<button
						onClick={handleCancel}
						disabled={busy}
						className="bg-white/10 px-4 py-2 rounded-lg"
					>
						Cancel
					</button>
					<button
						onClick={handleDelete}
						disabled={busy}
						className="bg-red-600 px-4 py-2 rounded-lg font-semibold"
					>
						{busy ? "Deleting..." : "Yes, delete"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteModal;
