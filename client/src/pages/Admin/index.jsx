import React from "react";
import Intro from "../../components/Admin/Intro";
import MyCreation from "../../components/Admin/MyCreations";
import AlittleAboutMe from "../../components/Admin/AlittleAboutMe";

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
					<MyCreation />
				</div>
			</div>
		</div>
	);
};

export default Admin;
