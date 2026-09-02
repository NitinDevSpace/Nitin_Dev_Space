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
			setIsSmall(window.innerWidth < 768);
			if (window.innerWidth >= 768) setMenuOpen(false);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return isSmall ? (
		<div className="flex w-full text-accent2 justify-self-center pt-6 fixed top-0 z-50">
			<button
				className="fixed right-3 top-4 p-2 rounded focus:outline-none z-50 bg-primary/40 backdrop-blur-md border border-white/10"
				onClick={() => setMenuOpen((open) => !open)}
				aria-label={menuOpen ? "Close menu" : "Open menu"}
			>
				{menuOpen ? <X size={28} /> : <Menu size={28} />}
			</button>
			{menuOpen && (
				<div className="fixed top-0 right-0 h-fit backdrop-blur-md rounded-bl-xl w-[min(80%,18rem)] bg-primary/80 shadow-2xl z-40 flex flex-col pt-20 px-8 pb-6 border border-white/10">
					<Link
						className="flex items-center gap-2 py-3 text-base hover-scale"
						to={"/"}
						onClick={() => setMenuOpen(false)}
					>
						<House size={18} />
						Home
					</Link>
					<Link
						className="flex items-center gap-2 py-3 text-base hover-scale"
						to={"/profile"}
						onClick={() => setMenuOpen(false)}
					>
						<UserPen size={18} />
						Profile
					</Link>
					<Link
						className="flex items-center gap-2 py-3 text-base hover-scale"
						to={"/projects"}
						onClick={() => setMenuOpen(false)}
					>
						<FolderGit2 size={18} />
						Projects
					</Link>
					<Link
						className="flex items-center gap-2 py-3 text-base hover-scale"
						to={"/blogs"}
						onClick={() => setMenuOpen(false)}
					>
						<Logs size={18} />
						Blogs
					</Link>
					<Link
						className="flex items-center gap-2 py-3 text-base hover-scale text-accent2"
						to={"/contact"}
						onClick={() => setMenuOpen(false)}
					>
						<Mail size={18} />
						Contact
					</Link>
				</div>
			)}
			{menuOpen && (
				<div
					className="fixed inset-0 bg-black/40 z-30"
					onClick={() => setMenuOpen(false)}
				/>
			)}
		</div>
	) : (
		<div className="flex w-[min(92%,72rem)] text-accent1 backdrop-blur-md justify-self-center pt-6 fixed top-0 left-1/2 -translate-x-1/2 z-50">
			<motion.div
				initial={{ y: 24, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.45, ease: easeOut }}
				className="flex items-center justify-between gap-2 md:gap-4 w-full px-2 min-w-0"
			>
				<Link
					className="flex hover-scale gap-1.5 px-2 py-2 text-sm lg:text-base shrink-0"
					to={"/profile"}
				>
					<UserPen size={18} />
					Profile
				</Link>
				<Link
					className="flex hover-scale gap-1.5 px-2 py-2 text-sm lg:text-base shrink-0"
					to={"/projects"}
				>
					<FolderGit2 size={18} />
					Projects
				</Link>

				<img
					src={logo}
					alt="logo"
					className="w-12 lg:w-14 hover:cursor-pointer hover-scale drop-shadow-2xl shrink-0"
					onClick={() => {
						navigate("/");
					}}
				/>

				<Link
					className="flex hover-scale gap-1.5 px-2 py-2 text-sm lg:text-base shrink-0"
					to={"/blogs"}
				>
					<Logs size={18} />
					Blogs
				</Link>
				<Link
					to={"/contact"}
					className="flex hover-scale gap-1.5 text-accent2 px-2 py-2 text-sm lg:text-base shrink-0"
				>
					<Mail size={18} />
					Contact
				</Link>
			</motion.div>
		</div>
	);
};

export default NavBar;
