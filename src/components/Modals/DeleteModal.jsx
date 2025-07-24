import React from "react";
import { deleteProject } from "../../services/projects.service";

function DeleteModal({
	selectedProject,
	getData,
	setSelectedProject,
	onClose,
}) {
	const handleDelete = async () => {
		const res = await deleteProject(selectedProject);
		console.log(res.message);
		setSelectedProject(null);
		getData();
		onClose();
	};

	const handleCancel = () => {
		setSelectedProject(null);
		onClose();
	};

	return (
		<div
			className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
			onClick={handleCancel}
		>
			<div
				className="flex flex-col items-center p-4 bg-white/90 text-black rounded-lg shadow-lg"
				onClick={(e) => e.stopPropagation()}
			>
				<h1>Are you sure you wanna delete this project?</h1>
				<div>
					<button
						onClick={handleCancel}
						className="bg-orange m-4 text-white rounded-lg p-2"
					>
						Cancel
					</button>
					<button
						onClick={handleDelete}
						className="bg-orange m-4 text-white rounded-lg p-2"
					>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteModal;
