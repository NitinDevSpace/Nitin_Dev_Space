import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FolderGit2, House, Logs, Mail, UserPen } from "lucide-react";
import { easeOut, motion } from "framer-motion";

const NavBar = () => {
	const navigate = useNavigate();
	return (
		<div className="flex w-5/6 text-accent1 overflow-hidden justify-self-center pt-8 fixed top-0 z-50">
			<motion.div
				initial={{ y: 90 }}
				animate={{ y: 0 }}
				transition={{ delay: 0.5, duration: 1, ease: easeOut }}
				className="flex items-center  justify-center sm:justify-evenly w-full"
			>
				<Link className="flex hover-scale gap-2 px-4 py-2" to={"/profile"}>
					<UserPen />
					Profile
				</Link>
				<Link className="flex hover-scale gap-2 px-4 py-2" to={"/projects"}>
					<FolderGit2 />
					Projects
				</Link>

				<motion.div
					initial={{ opacity: 0, y: 0, scaleX: 0, scale: 1.8 }}
					animate={{ opacity: 1, y: 0, scaleX: 1 }}
					transition={{ delay: 1, duration: 1, ease: easeOut }}
					className="invisible  sm:visible "
				>
					<img
						src={logo}
						alt="logo"
						className="w-14 hover:cursor-pointer hover-scale drop-shadow-2xl"
						onClick={() => {
							navigate("/");
						}}
					/>
				</motion.div>

				<Link
					className="flex hidden hover-scale sm:flex gap-2 px-4 py-2"
					to={"/blogs"}
				>
					<Logs />
					Blogs
				</Link>
				<Link
					to={"/contact"}
					className="flex  hover-scale gap-2 text-accent2 px-4 py-2 "
				>
					<Mail />
					Contact
				</Link>
			</motion.div>
		</div>
	);
};

export default NavBar;
