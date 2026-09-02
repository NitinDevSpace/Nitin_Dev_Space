import { axiosInstance } from ".";

export const getProfile = async () => {
	try {
		const res = await axiosInstance.get("/api/profile");
		return res.data;
	} catch (error) {
		console.log("Error fetching profile", error);
	}
};

export const updateProfile = async (payload) => {
	try {
		const res = await axiosInstance.post("/api/profile", payload);
		return res.data;
	} catch (error) {
		console.log("Error updating profile", error);
	}
};
