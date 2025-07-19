import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FolderGit2, House, Logs, Mail, UserPen } from "lucide-react";

const NavBar = () => {
	const navigate = useNavigate();
	return (
		<div className="flex w-5/6 justify-self-center pt-8  fixed top-0 z-50">
			<div className="h-fit w-full flex ">
				<img
					src={logo}
					alt="logo"
					className="w-12"
					onClick={() => {
						navigate("/");
					}}
				/>
			</div>
			<div className="flex items-center justify-end gap-12">
				<Link className="flex gap-2" to={"/"}>
					<House />
					Home
				</Link>
				<Link className="flex gap-2" to={"/profile"}>
					<UserPen />
					Profile
				</Link>
				<Link className="flex gap-2" to={"/projects"}>
					<FolderGit2 />
					Projects
				</Link>

				<Link className="flex gap-2" to={"/blogs"}>
					<Logs />
					Blogs
				</Link>
				<Link
					to={"/contact"}
					className="flex gap-2 bg-accent2 text-black animate-pulse rounded px-4 py-2 "
				>
					<Mail />
					Contact
				</Link>
			</div>
		</div>
	);
};

export default NavBar;
