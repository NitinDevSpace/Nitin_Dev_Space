import { axiosInstance } from ".";

export const verifyPassword = async (password) => {
    try {
        const res = await axiosInstance.post("/api/verifypassword", { password });
        return res.data;
    } catch (error) {
        console.log("Error getting Password", error);
    }
};
