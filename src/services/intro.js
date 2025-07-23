import {axiosInstance} from ".";

export const updateIntro = async (payload) => {
	try {
		const res = await axiosInstance.post("/api/intro", payload);
        return res.data;
	} catch (error) {
		console.log("Error updating Intro", error);
	}
};

