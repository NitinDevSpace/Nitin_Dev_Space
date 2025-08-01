import { axiosInstance } from ".";

export const sendMessage = async (payload) => {
	try {
		const res = await axiosInstance.post("/api/message", payload);
		return res.data;
	} catch (error) {
		console.log("Error sending message", error);
	}
};
