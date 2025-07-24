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
export const addProject = async (payload) => {
	try {
		const res = await axiosInstance.post("/api/projects", payload);
		return res.data;
	} catch (error) {
		console.log("Error adding project", error);
	}
};
export const updateProject = async (id, payload) => {
	try {
		const res = await axiosInstance.patch(`/api/projects?id=${id}`, payload);
		return res.data;
	} catch (error) {
		console.log("Error updating project", error);
	}
};
export const deleteProject = async (id) => {
	try {
		const res = await axiosInstance.delete(`/api/projects?id=${id}`);
		console.log(res.data);
		return res.data;
	} catch (error) {
		console.log("Error deleting project", error);
	}
};
