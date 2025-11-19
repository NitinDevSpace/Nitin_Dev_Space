import { axiosInstance } from ".";

export const getAllFeedback = async () => {
    try {
        const res = await axiosInstance.get("/api/feedback");
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const submitFeedback = async (payload) => {
    try {
        if (!payload) {
            console.log("Payload is Empty");
        }
        const res = await axiosInstance.post("/api/feedback", payload);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
