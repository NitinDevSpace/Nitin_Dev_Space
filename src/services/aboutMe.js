import { axiosInstance } from ".";

export const getAboutme = async () => {
	try {
		const res = await axiosInstance.get("/api/aboutMe");
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateAboutme = async (payload) => {
	try {
		if (!payload) {
			console.log("Payload is Empty");
		}
		const res = await axiosInstance.post("/api/aboutMe", payload);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
