import {axiosInstance} from ".";

export const updateIntro = async (payload) => {
	try {
		const res = await axiosInstance.post(
			"http://localhost:5173/api/intro",
			payload
		);
        return res.data;
	} catch (error) {
		console.log("Error updating Intro", error);
	}
};

