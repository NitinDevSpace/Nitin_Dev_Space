import { axiosInstance } from ".";

export const getResumeMeta = async () => {
	try {
		const res = await axiosInstance.get("/api/resume?meta=1");
		return res.data;
	} catch {
		return null;
	}
};

export const uploadResume = async (file) => {
	const toBase64 = (f) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(f);
		});

	const data = await toBase64(file);
	const res = await axiosInstance.post("/api/resume", {
		filename: file.name,
		contentType: file.type || "application/pdf",
		data,
	});
	return res.data;
};

export const resumeFileUrl = "/api/resume";
