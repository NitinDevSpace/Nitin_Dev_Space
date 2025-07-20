import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FolderGit2, House, Logs, Mail, UserPen } from "lucide-react";

const NavBar = () => {
	const navigate = useNavigate();
	return (
		<div className="flex w-5/6 text-accent1 justify-self-center pt-8 fixed top-0 z-50">
			<div className="flex items-center justify-center justify-evenly w-full">
				<Link className="flex gap-2 px-4 py-2" to={"/profile"}>
					<UserPen />
					Profile
				</Link>
				<Link className="flex gap-2 px-4 py-2" to={"/projects"}>
					<FolderGit2 />
					Projects
				</Link>
				<div className="h-fit scale-150 ">
					<img
						src={logo}
						alt="logo"
						className="w-14"
						onClick={() => {
							navigate("/");
						}}
					/>
				</div>

				<Link className="flex gap-2 px-4 py-2" to={"/blogs"}>
					<Logs />
					Blogs
				</Link>
				<Link to={"/contact"} className="flex gap-2 text-accent2 px-4 py-2 ">
					<Mail />
					Contact
				</Link>
			</div>
		</div>
	);
};

export default NavBar;
