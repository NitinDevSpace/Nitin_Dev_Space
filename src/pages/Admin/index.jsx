import React, { useEffect, useState } from "react";
import IntroAdmin from "./IntroAdmin";
import AlittleAboutMeAdmin from "./AboutMeAdmin";
import ProjectsAdmin from "./ProjectsAdmin";
import { getPassword } from "../../services/password.service";

const Admin = () => {
	const [auth, setAuth] = useState(false);
	const [password, setPassword] = useState("");
	const [fetchedPassword, setFetchedPassword] = useState("");

	const getData = async () => {
			try {
				const res = await getPassword();
				if (!res) {
					console.log("Error fetching");
				}
				
				setFetchedPassword(res.data.password);
			} catch (error) {
				console.error(
					"HTTP error fetching intro:",
					error.response?.status,
					error.message
				);
			}
		};

	const authenticate = () => {
		getData();
		if (password === "") {
			alert("Enter Password");
			return;
		}
		if (password === fetchedPassword) {
			setAuth(true);
		} else {
			alert("Wrong Password.. Go Away!!");
		}
	};

	const deAuthenticate = () => {
		setAuth(false);
		setPassword("");
	};

	return (
		<>
			{auth ? (
				<div className="relative flex flex-col justify-center items-center min-h-screen">
					<h1 className="text-4xl m-24">Admin</h1>
					{/* Main Container for Admin */}
					<div className="w-11/12">
						{/* Intro Container */}
						<div>
							<IntroAdmin />
						</div>
						{/* A Little About Me container */}
						<div>
							<AlittleAboutMeAdmin />
						</div>
						{/* My creations Container */}
						<div>
							<ProjectsAdmin />
						</div>
					</div>
					<button
						onClick={deAuthenticate}
						className="absolute top-24 right-20 p-4 m-12 rounded bg-red-700 "
					>
						Deauthenticate
					</button>
				</div>
			) : (
				<div className="flex flex-col justify-center items-center min-h-screen ">
					<h1 className="text-4xl text-red-500 mb-12">
						You are Not Autherized!!
					</h1>
					<div className="flex flex-col gap-5">
						<label htmlFor="password">
							Enter Password to get Autherization
						</label>
						<input
							type="password"
							name="pasword"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter The Password"
							className="bg-secondary focus:outline-none rounded p-2"
						/>
						<button
							onClick={authenticate}
							className="p-4 m-12 rounded bg-green-700 "
						>
							Authenticate
						</button>
					</div>
				</div>
			)};
		</>
	);
};

export default Admin;
