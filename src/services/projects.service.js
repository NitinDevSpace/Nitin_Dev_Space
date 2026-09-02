import { axiosInstance } from ".";

export const getProjectById = async (id) => {
	try {
		const res = await axiosInstance.get(`/api/projects?id=${id}`);
		return res.data;
	} catch (error) {
		console.log("Error fetching project by id", error);
	}
};
export const getAllProjects = async () => {
	try {
		const res = await axiosInstance.get("/api/projects");
		return res.data;
	} catch (error) {
		console.log("Error fetching all projects", error);
	}
};

export const getKeyProjects = async () => {
	try {
		const res = await axiosInstance.get("/api/projects?key=1");
		return res.data;
	} catch (error) {
		console.log("Error fetching key projects", error);
	}
};
export const addProject = async (payload) => {
	try {
		const res = await axiosInstance.post("/api/projects", payload);
		return res.data;
	} catch (error) {
		console.log("Error adding project", error);
		return {
			success: false,
			message:
				error?.response?.data?.message ||
				error?.message ||
				"Error adding project",
		};
	}
};
export const updateProject = async (id, payload) => {
	try {
		const res = await axiosInstance.patch(
			`/api/projects?id=${encodeURIComponent(id)}`,
			payload
		);
		return res.data;
	} catch (error) {
		console.log("Error updating project", error);
		return {
			success: false,
			message:
				error?.response?.data?.message ||
				error?.message ||
				"Error updating project",
		};
	}
};
export const deleteProject = async (id) => {
	try {
		const res = await axiosInstance.delete(`/api/projects?id=${encodeURIComponent(id)}`);
		return res.data;
	} catch (error) {
		console.log("Error deleting project", error);
		return {
			success: false,
			message:
				error?.response?.data?.message ||
				error?.message ||
				"Error deleting project",
		};
	}
};
