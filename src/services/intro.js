import { axiosInstance } from ".";

export const updateIntro = async (payload) => {
	try {
		const res = await axiosInstance.post("/api/intro", payload);
		return res;
	} catch (error) {
		console.log("Error updating Intro", error);
	}
};

export const getIntro = async () => {
	try {
		const res = await axiosInstance.get("/api/intro");
		return res;
	} catch (error) {
		console.log("Error getting Intro", error);
	}
};
