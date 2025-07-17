import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
	const navigate = useNavigate();
	return (
		<div className="flex w-11/12 justify-self-center pt-8">
			<div className="h-fit grow flex ">
				<img
					src={logo}
					alt="logo"
					className="w-12"
					onClick={() => {
						navigate("/");
					}}
				/>
				<div className="flex items-center grow justify-end gap-12">
					<Link to={"/"}>Home</Link>
					<Link to={"/resume"}>Resume</Link>
					<Link to={"/projects"}>Projects</Link>
					<Link to={"/nai"}>Blogs</Link>
					<Link to={"/contact"} className="bg-secondary rounded px-4 py-2 ">
						Contact
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
