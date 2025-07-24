import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getIntro, updateIntro } from "../../services/intro.service";

function Intro() {
	const [open, setOpen] = useState(false);
	const [intro, setIntro] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = new FormData(e.target);
			const payload = {
				imageUrl: data.get("imageUrl"),
				bio: data.get("bio"),
			};
			const res = await updateIntro(payload);
			if (res) {
				console.log(res.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getData = async () => {
		try {
			const res = await getIntro();
			if (!res) {
				console.log("Error fetching");
			}
			setIntro(res.data);
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
				<h1 className="pb-2 text-2xl border-b-2">Intro</h1>
			</div>
			{/* Form & para Collapsible */}
			{open && (
				<div className="flex m-6 flex-col">
					<div>
						<h1>Upload an Image</h1>
						<div>Image Container</div>
					</div>
					<form onSubmit={handleSubmit} className="mt-6">
						<div className="mb-4 flex items-center">
							<label htmlFor="imageUrl" className="text-xl">
								Image Url:
							</label>
							<input
								type="text"
								placeholder="Enter the image URL"
								name="imageUrl"
								id="imageUrl"
								className="dark-input"
								value={intro.imageUrl}
								onChange={(e) =>
									setIntro((prev) => ({ ...prev, imageUrl: e.target.value }))
								}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="bio" className="text-xl">
								Bio:
							</label>
							<textarea
								className="dark-input"
								rows="3"
								onInput={(e) => {
									e.target.style.height = "auto"; // reset height
									e.target.style.height = `${e.target.scrollHeight}px`; // set to full scroll height
								}}
								name="bio"
								id="bio"
								placeholder="Enter your bio"
								value={intro.bio}
								onChange={(e) =>
									setIntro((prev) => ({ ...prev, bio: e.target.value }))
								}
							/>
						</div>
						<button
							type="submit"
							className="p-2 bg-orange rounded-lg mt-4 justify-self-center flex"
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

export default Intro;
