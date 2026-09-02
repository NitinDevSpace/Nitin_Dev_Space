import { axiosInstance } from ".";

export const getStats = async () => {
	try {
		const res = await axiosInstance.get("/api/stats");
		return res.data;
	} catch (error) {
		console.log("Error fetching stats", error);
	}
};
