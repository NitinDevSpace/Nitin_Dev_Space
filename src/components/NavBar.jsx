import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FolderGit2, House, Logs, Mail, UserPen, Menu, X } from "lucide-react";
import { easeOut, motion } from "framer-motion";

const NavBar = () => {
	const navigate = useNavigate();
	const [isSmall, setIsSmall] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsSmall(window.innerWidth < 650);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return isSmall ? (
		<div className="flex w-full text-accent2 overflow-hidden justify-self-center pt-8 fixed top-0 z-50">
			{/* Hamburger Menu Button */}
			<button
				className="ml-4 mt-2 p-2 rounded focus:outline-none z-50 bg-transparent"
				onClick={() => setMenuOpen((open) => !open)}
				aria-label={menuOpen ? "Close menu" : "Open menu"}
			>
				{menuOpen ? <X size={32} /> : <Menu size={32} />}
			</button>
			{/* Drawer */}
			{menuOpen && (
				<div
					className="fixed top-0 left-0 h-fit backdrop-blur-md rounded w-3/4 max-w-xs bg-primary/60  shadow-2xl z-40 flex flex-col pt-24 px-12 transition-all"
					style={{ transition: "transform 0.3s ease" }}
				>
					<Link
						className="flex items-center gap-2 py-4 text-lg hover-scale"
						to={"/"}
						onClick={() => setMenuOpen(false)}
					>
						<House />
						Home
					</Link>
					<Link
						className="flex items-center gap-2 py-4 text-lg hover-scale"
						to={"/profile"}
						onClick={() => setMenuOpen(false)}
					>
						<UserPen />
						Profile
					</Link>
					<Link
						className="flex items-center gap-2 py-4 text-lg hover-scale"
						to={"/projects"}
						onClick={() => setMenuOpen(false)}
					>
						<FolderGit2 />
						Projects
					</Link>
					<Link
						className="flex items-center gap-2 py-4 text-lg hover-scale"
						to={"/blogs"}
						onClick={() => setMenuOpen(false)}
					>
						<Logs />
						Blogs
					</Link>
					<Link
						className="flex items-center gap-2 py-4 text-lg hover-scale text-accent2"
						to={"/contact"}
						onClick={() => setMenuOpen(false)}
					>
						<Mail />
						Contact
					</Link>
				</div>
			)}
			{/* Overlay to close drawer */}
			{menuOpen && (
				<div
					className="fixed inset-0 bg-black opacity-30 z-30"
					onClick={() => setMenuOpen(false)}
				/>
			)}
		</div>
	) : (
		<div className="flex w-5/6 text-accent1 backdrop-blur-md overflow-hidden justify-self-center pt-8 fixed top-0 z-50">
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
