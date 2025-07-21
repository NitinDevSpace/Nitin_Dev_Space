import { ArrowDown } from "lucide-react";
import React, { useState } from "react";

function AlittleAboutMe() {
	const [open, setOpen] = useState(false); 

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		const payload = {
			para: data.get("para"),
			frontend: data.get("frontend"),
			backend: data.get("backend"),
			ai: data.get("ai"),
			// image: data.get("image"),
		};
		console.log("Form Submitted", payload);
	};

	return (
		<div className="bg-primary2 flex flex-col justify-center rounded-lg h-fit m-4 p-4">
			{/* Heading Intro */}
			<div className="flex">
				<button
					onClick={() => {
						setOpen(!open);
					}}
				>
					<ArrowDown />{" "}
				</button>
				<h1 className="p-6 text-2xl border-b-2">A Little About me</h1>
			</div>
			{/* Form & para Collapsible */}
			{open && (
				<div className="flex m-6 flex-col">
					<form onSubmit={handleSubmit} method="post" className="mt-6">
						<div className="flex flex-col">
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
							/>
						</div>
						<div className="flex flex-col gap-2">
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
							/>
						</div>
						<div className="flex flex-col gap-2">
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
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="ai" className="text-xl">
								Ai:
							</label>
							<textarea
								className="dark-input"
								rows="3"
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
							className="p-2 bg-pink shadow-2xl rounded-lg mt-4 justify-self-center flex"
						>
							Update
						</button>
					</form>
				</div>
			)}
		</div>
	);
}

export default AlittleAboutMe;
