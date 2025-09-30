import { axiosInstance } from ".";

export const sendMessage = async (payload) => {
	try {
		const res = await axiosInstance.post("/api/message", payload);
		return res.data;
	} catch (error) {
		console.log("Error sending message", error);
	}
};

export const getMessages = async (payload) => {
	try {
		const res = await axiosInstance.get("/api/message");
		return res.data;
	} catch (error) {
		console.log("Error getting message", error);
	}
};
