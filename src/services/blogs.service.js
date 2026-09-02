import { axiosInstance } from ".";

export const getAllBlogs = async (all = false) => {
	try {
		const res = await axiosInstance.get(`/api/blogs${all ? "?all=1" : ""}`);
		return res.data;
	} catch (error) {
		console.log("Error fetching blogs", error);
	}
};

export const getBlogBySlug = async (slug) => {
	try {
		const res = await axiosInstance.get(`/api/blogs?slug=${encodeURIComponent(slug)}`);
		return res.data;
	} catch (error) {
		console.log("Error fetching blog", error);
	}
};

export const getBlogById = async (id) => {
	try {
		const res = await axiosInstance.get(`/api/blogs?id=${id}`);
		return res.data;
	} catch (error) {
		console.log("Error fetching blog by id", error);
	}
};

export const addBlog = async (payload) => {
	try {
		const res = await axiosInstance.post("/api/blogs", payload);
		return res.data;
	} catch (error) {
		console.log("Error adding blog", error);
	}
};

export const updateBlog = async (id, payload) => {
	try {
		const res = await axiosInstance.patch(`/api/blogs?id=${id}`, payload);
		return res.data;
	} catch (error) {
		console.log("Error updating blog", error);
	}
};

export const deleteBlog = async (id) => {
	try {
		const res = await axiosInstance.delete(
			`/api/blogs?id=${encodeURIComponent(id)}`
		);
		return res.data;
	} catch (error) {
		console.log("Error deleting blog", error);
		return {
			success: false,
			message:
				error?.response?.data?.message ||
				error?.message ||
				"Error deleting blog",
		};
	}
};
