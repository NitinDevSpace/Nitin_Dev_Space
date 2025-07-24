import React from "react";
import IntroAdmin from "./IntroAdmin";
import AlittleAboutMeAdmin from "./AboutMeAdmin";
import ProjectsAdmin from "./ProjectsAdmin";

const Admin = () => {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<h1 className="text-4xl">Admin</h1>
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
		</div>
	);
};

export default Admin;
