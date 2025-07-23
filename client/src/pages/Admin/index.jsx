import React from "react";
import Intro from "./Intro";
import AlittleAboutMe from "./AlittleAboutMe";
import Projects from "./Projects";

const Admin = () => {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<h1 className="text-4xl">Admin</h1>
			{/* Main Container for Admin */}
			<div className="w-11/12">
				{/* Intro Container */}
				<div>
					<Intro />
				</div>
				{/* A Little About Me container */}
				<div>
					<AlittleAboutMe />
				</div>
				{/* My creations Container */}
				<div>
					<Projects />
				</div>
			</div>
		</div>
	);
};

export default Admin;
