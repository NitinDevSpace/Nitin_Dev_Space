import { axiosInstance } from ".";

export const getPassword = async () => {
    try {
        const res = await axiosInstance.get("/api/getPassword");
        return res.data;
    } catch (error) {
        console.log("Error getting Password", error);
    }
};
