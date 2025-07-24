import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAboutme, updateAboutme } from "../../services/aboutMe.service";

function AlittleAboutMe() {
	const [open, setOpen] = useState(false);
	const [about, setAbout] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		const payload = {
			para: data.get("para"),
			frontend: data.get("frontend"),
			backend: data.get("backend"),
			ai: data.get("ai"),
		};
		const res = await updateAboutme(payload);
		console.log(res.message);
	};

	const getData = async () => {
		try {
			const res = await getAboutme();
			if (!res) {
				console.log("Error fetching");
			}
			setAbout(res.data);
		} catch (error) {
			console.error(
				"HTTP error fetching intro:",
				error.response?.status,
				error.message
			);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="bg-primary2 relative flex flex-col justify-center rounded-lg h-fit m-4 p-4">
			{/* Heading Intro */}
			<div
				onClick={() => {
					setOpen(!open);
				}}
				className="flex"
			>
				<h1 className="pb-2 text-2xl border-b-2">A Little About me</h1>
			</div>
			{/* Form & para Collapsible */}
			{open && (
				<div className="flex m-6 flex-col">
					<form onSubmit={handleSubmit} method="post" className="mt-6">
						<div className="flex mt-4  flex-col gap-2">
							<label htmlFor="para" className="text-xl">
								Para:
							</label>
							<textarea
								className="dark-input"
								rows="3"
								onInput={(e) => {
									e.target.style.height = "auto"; // reset height
									e.target.style.height = `${e.target.scrollHeight}px`; // set to full scroll height
								}}
								name="para"
								id="para"
								placeholder="Enter About Yourself"
								value={about.para}
								onChange={(e) => {
									setAbout((prev) => ({ ...prev, para: e.target.value }));
								}}
							/>
						</div>
						<div className="flex mt-4  flex-col gap-2">
							<label htmlFor="frontend" className="text-xl">
								Frontend:
							</label>
							<textarea
								className="dark-input"
								rows="3"
								onInput={(e) => {
									e.target.style.height = "auto"; // reset height
									e.target.style.height = `${e.target.scrollHeight}px`; // set to full scroll height
								}}
								name="frontend"
								id="frontend"
								placeholder="Enter Frontend Para"
								value={about.frontend}
								onChange={(e) => {
									setAbout((prev) => ({ ...prev, frontend: e.target.value }));
								}}
							/>
						</div>
						<div className="flex mt-4  flex-col gap-2">
							<label htmlFor="backend" className="text-xl">
								Backend:
							</label>
							<textarea
								className="dark-input"
								rows="3"
								onInput={(e) => {
									e.target.style.height = "auto"; // reset height
									e.target.style.height = `${e.target.scrollHeight}px`; // set to full scroll height
								}}
								name="backend"
								id="backend"
								placeholder="Enter Backend Para"
								value={about.backend}
								onChange={(e) => {
									setAbout((prev) => ({ ...prev, backend: e.target.value }));
								}}
							/>
						</div>
						<div className="flex mt-4  flex-col gap-2">
							<label htmlFor="ai" className="text-xl">
								Ai:
							</label>
							<textarea
								className="dark-input"
								rows="3"
								value={about.ai}
								onChange={(e) => {
									setAbout((prev) => ({ ...prev, ai: e.target.value }));
								}}
								onInput={(e) => {
									e.target.style.height = "auto"; // reset height
									e.target.style.height = `${e.target.scrollHeight}px`; // set to full scroll height
								}}
								name="ai"
								id="ai"
								placeholder="Enter Ai Para"
							/>
						</div>
						<button
							type="submit"
							className="p-2 bg-orange shadow-2xl rounded-lg mt-4  justify-self-center flex"
						>
							Update
						</button>
					</form>
				</div>
			)}
			<button
				onClick={() => {
					setOpen(!open);
				}}
				className="absolute top-4 right-5"
			>
				{open ? <ArrowUp /> : <ArrowDown />}
			</button>
		</div>
	);
}

export default AlittleAboutMe;
