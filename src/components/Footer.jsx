import React, { useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
	ArrowUp,
	Braces,
	Code,
	Github,
	Instagram,
	Linkedin,
	Mail,
} from "lucide-react";
import { easeInOut, motion, useInView } from "framer-motion";
import { sectionInView } from "../utils/motion";

function Footer() {
	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const ref = useRef(null);
	const isInView = useInView(ref, sectionInView);

	return (
		<div className="relative my-2 justify-self-center shadow-2xl py-10 sm:py-12 flex flex-col justify-center w-11/12 min-h-0 sm:min-h-[80dvh] items-center">
			<motion.div
				ref={ref}
				initial={false}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
				transition={{ duration: 0.7, ease: easeInOut }}
				className="flex relative z-30 bg-primary3 py-8 px-4 sm:px-12 rounded-lg shadow-2xl w-11/12 justify-center h-fit items-center"
			>
				<div className="w-full">
					<div className="border-b-2 flex justify-between flex-col pb-12 lg:flex-row">
						<div className="flex gap-4 mb-4 flex-col">
							<div className="flex items-center">
								<img
									src={logo}
									alt="Nitin Dev Space"
									className="w-14 sm:w-16 h-14 sm:h-16 rounded-lg p-1 object-contain"
								/>
								<h1 className="p-2 font-semibold text-xl sm:text-2xl">
									Nitin Dev Space
								</h1>
							</div>
							<p className="opacity-80 text-sm sm:text-base max-w-md">
								Nitin Dev Space is a software brand for custom web apps,
								freelance builds, and products that ship. Hire the brand to
								create your next project.
							</p>
						</div>
						{/* Right Section */}
						<div className="flex flex-col">
						{/* Internal Pages Links */}
							<ul className="flex flex-wrap text-base sm:text-xl text-accent1 items-center gap-2 sm:gap-4 p-2 sm:p-6 pb-8 sm:pb-12">
								<li className="hover-scale hover:text-accent2">
									<Link to={"/"}>Home </Link>
								</li>
								<li className="text-xl sm:text-2xl opacity-60">/</li>
								<li className="hover-scale hover:text-accent2">
									<Link to={"/profile"}>About Me </Link>
								</li>
								<li className="text-xl sm:text-2xl opacity-60">/</li>
								<li className="hover-scale hover:text-accent2">
									<Link to={"/projects"}>Projects </Link>
								</li>
								<li className="text-xl sm:text-2xl opacity-60">/</li>
								<li className="hover-scale hover:text-accent2">
									<Link to={"/blogs"}>Blogs</Link>
								</li>
								<li className="text-xl sm:text-2xl opacity-60">/</li>
								<li className="hover-scale hover:text-accent2">
									<Link to={"/contact"}>Contact</Link>
								</li>
							</ul>
							<div className=" items-center flex flex-col justify-center flex-wrap gap-6 left-1/2 ">
								{/* External Links */}
								<div className=" items-center flex justify-center flex-wrap gap-4 left-1/2">
									<div className="relative group">
										<a
											href="https://github.com/NitinDevSpace"
											target="_blank"
											rel="me noopener noreferrer"
											aria-label="GitHub"
											className="bg-primary hover-scale text-white rounded-full w-10 h-10 flex items-center justify-center"
										>
											<Github />
										</a>
										<span className="opacity-0 mt-6 top-1/2 left-1/2 -translate-x-1/2 px-1 group-hover:opacity-80 bg-primary text-white rounded absolute transition duration-200 pointer-events-none z-50">
											Github
										</span>
									</div>
									<div className="relative group">
										<a
											href="https://www.linkedin.com/in/nitindevspace/"
											target="_blank"
											rel="me noopener noreferrer"
											aria-label="LinkedIn"
											className="bg-primary hover-scale text-white rounded-full w-10 h-10 flex items-center justify-center"
										>
											<Linkedin />
										</a>
										<span className="opacity-0  mt-6 top-1/2 left-1/2 -translate-x-1/2 px-1 group-hover:opacity-80 bg-primary text-white rounded absolute transition duration-200 pointer-events-none z-50">
											LinkedIn
										</span>
									</div>
									<div className="relative group">
										<a
											href="https://leetcode.com/u/NitinDevSpace/"
											target="_blank"
											rel="me noopener noreferrer"
											aria-label="LeetCode"
											className="bg-primary hover-scale text-white rounded-full w-10 h-10 flex items-center justify-center"
										>
											<Code />
										</a>
										<span className="opacity-0  mt-6 top-1/2 left-1/2 -translate-x-1/2 px-1 group-hover:opacity-80 bg-primary text-white rounded absolute transition duration-200 pointer-events-none z-50">
											LeetCode
										</span>
									</div>
									<div className="relative group">
										<a
											href="https://www.hackerrank.com/profile/nitindevspace"
											target="_blank"
											rel="me noopener noreferrer"
											aria-label="HackerRank"
											className="bg-primary hover-scale text-white rounded-full w-10 h-10 flex items-center justify-center"
										>
											<Braces />
										</a>
										<span className="opacity-0  mt-6 top-1/2 left-1/2 -translate-x-1/2 px-1 group-hover:opacity-80 bg-primary text-white rounded absolute transition duration-200 pointer-events-none z-50">
											HackerRank
										</span>
									</div>
									<div className="relative group">
										<a
											href="https://www.instagram.com/creative_core_23/"
											target="_blank"
											rel="me noopener noreferrer"
											aria-label="Instagram"
											className="bg-primary hover-scale text-white rounded-full w-10 h-10 flex items-center justify-center"
										>
											<Instagram />
										</a>
										<span className="opacity-0  mt-6 top-1/2 left-1/2 -translate-x-1/2 px-1 group-hover:opacity-80 bg-primary text-white rounded absolute transition duration-200 pointer-events-none z-50">
											Instagram
										</span>
									</div>
									<div className="relative group">
										<a
											href="mailto:nitindevspace@gmail.com"
											rel="me"
											aria-label="Email"
											className="bg-primary hover-scale text-white rounded-full w-10 h-10 flex items-center justify-center"
										>
											<Mail />
										</a>
										<span className="opacity-0  mt-6 top-1/2 left-1/2 -translate-x-1/2 px-1 group-hover:opacity-80 bg-primary text-white rounded absolute transition duration-200 pointer-events-none z-50">
											Email
										</span>
									</div>
								</div>
							</div>
						</div>
						{/* Top Button */}
						<button
							onClick={scrollTop}
							className="flex absolute hover-scale text-primary bottom-0 bg-white rounded-lg m-4 sm:m-1 py-2 px-2 sm:bottom-36 lg:bottom-24 right-4 sm:right-14"
						>
							Top <ArrowUp className="animate-bounce ml-2" />
						</button>
					</div>
					{/* Copyright & Policies Section */}
					<div className="flex flex-col sm:flex-row gap-4 relative mt-6 font-thin opacity-60 text-sm justify-between">
						<span>© 2026 Nitin Kumar. All Rights Reserved.</span>
						<span>Built with Vite + React and ❤️.</span>
						<div className="flex flex-col sm:flex-row gap-4 items-start">
							<Link
								to={"/privacy-policies"}
								className="hover-scale hover:text-accent1 "
							>
								Privacy Policies
							</Link>
							<Link
								to={"/terms-conditions"}
								className="hover-scale hover:text-accent1 "
							>
								Terms of Service
							</Link>
							<Link
								to={"/cookie-settings"}
								className="hover-scale hover:text-accent1"
							>
								{" "}
								Cookie Setting
							</Link>
						</div>
					</div>
				</div>
			</motion.div>
			<div className="absolute bottom-0 z-10 overflow-hidden">
				<h1 className=" text-black/45 font-extrabold text-5xl">
					NitinDevSpace
				</h1>
			</div>
		</div>
	);
}

export default Footer;
