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

function Footer() {
	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth", // or "auto" for instant jump
		});
	};

	const openNewWindow = (url) => {
		const newWindow = window.open(url, "_blank", "noopener, noreferrer");
		if (newWindow) newWindow.focus();
	};

	const openEmailClient = () => {
		const email = "nitindevspace@gmail.com";
		const subject = "Let's Connect (From Portfolio)";
		const body = "Hi there,\n\nI'm reaching out to discuss...";

		const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
			subject
		)}&body=${encodeURIComponent(body)}`;

		window.open(mailtoLink, "_blank");
	};

	const ref = useRef(null);
	const isInView = useInView(ref, { once: false, threshold: 0.4 });

	return (
		<div className="relative my-2 justify-self-center shadow-2xl py-12 flex flex-col justify-center w-11/12 h-screen items-center">
			<motion.div
				ref={ref}
				initial={false}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
				transition={{ duration: 1, ease: easeInOut }}
				className="flex relative  bg-primary3 py-8 px-4 sm:px-12 rounded-lg shadow-2xl w-11/12 justify-center h-fit items-center"
			>
				<div className="w-full">
					<div className="border-b-2 flex justify-between flex-col pb-12 lg:flex-row">
						<div className="flex gap-4 mb-4 flex-col">
							<div className="flex items-center">
								<img
									src={logo}
									alt="logo"
									className="w-20 scale-150 h-20 rounded-lg p-2"
								/>
								<h1 className="p-2 text-bold text-2xl ">Nitin Dev Space</h1>
							</div>
							<p className="opacity-80">
								Passionate about building innovative web solutions and exploring{" "}
								<br />
								the frontiers of AI. Let's connect and create something <br />
								impactful.
							</p>
						</div>
						<div className="flex flex-col">
							<ul className="flex flex-wrap text-2xl text-accent1 items-center gap-4 p-6 pb-12">
								<li className="hover-scale hover:text-accent2">
									<Link to={"/"}>Home </Link>
								</li>
								<li className="text-3xl  opacity-60">/</li>
								<li className="hover-scale hover:text-accent2">
									<Link to={"/profile"}>About Me </Link>
								</li>
								<li className="text-3xl opacity-60">/</li>
								<li className="hover-scale hover:text-accent2">
									<Link to={"/profile"}>Projects </Link>
								</li>
								<li className="text-3xl opacity-60">/</li>
								<li className="hover-scale hover:text-accent2">
									<Link to={"/profile"}>Blogs</Link>
								</li>
								<li className="text-3xl opacity-60">/</li>
								<li className="hover-scale hover:text-accent2">
									<Link to={"/profile"}>Contact</Link>
								</li>
							</ul>
							<div className=" items-center flex flex-col justify-center flex-wrap gap-6 left-1/2 ">
								<div className=" items-center flex justify-center flex-wrap gap-4 left-1/2">
									<button
										onClick={() =>
											openNewWindow("https://github.com/NitinDevSpace")
										}
										className="bg-primary hover-scale text-accent2 rounded-full scale-125 p-2"
									>
										<Github />{" "}
									</button>
									<button
										onClick={() =>
											openNewWindow(
												"https://www.linkedin.com/in/nitindevspace/"
											)
										}
										className="bg-primary hover-scale text-accent2 rounded-full scale-125 p-2"
									>
										<Linkedin />{" "}
									</button>
									<button
										onClick={() =>
											openNewWindow("https://leetcode.com/u/NitinDevSpace/")
										}
										className="bg-primary hover-scale text-accent2 rounded-full scale-125 p-2"
									>
										<Code />{" "}
									</button>
									<button
										onClick={() =>
											openNewWindow(
												"https://www.hackerrank.com/profile/nitindevspace"
											)
										}
										className="bg-primary hover-scale text-accent2 rounded-full scale-125 p-2"
									>
										<Braces />{" "}
									</button>
									<button
										onClick={() =>
											openNewWindow(
												"https://www.instagram.com/creative_core_23/"
											)
										}
										className="bg-primary hover-scale text-accent2 rounded-full scale-125 p-2"
									>
										{" "}
										<Instagram />{" "}
									</button>
									<button
										onClick={openEmailClient}
										className="bg-primary hover-scale text-accent2 rounded-full scale-125 p-2"
									>
										{" "}
										<Mail />{" "}
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="flex relative mt-6 font-thin opacity-60 text-sm justify-between">
						<span>© 2025 Nitin Kumar. All Rights Reserved.</span>
						<span>Built with Vite + React, Tailwind CSS, and ❤️.</span>
						<div className="flex  flex-col sm:flex-row gap-4">
							<Link
								to={"/privacy"}
								className="underline hover-scale hover:text-blue-500 underline-offset-2 "
							>
								Privacy Policies
							</Link>
							<Link
								to={"/termsConditions"}
								className="underline hover-scale hover:text-blue-500 underline-offset-2 "
							>
								Terms of Service
							</Link>
							<Link
								to={"/cookies"}
								className="underline hover-scale hover:text-blue-500 underline-offset-2 "
							>
								{" "}
								Cookie Setting
							</Link>
						</div>
					</div>
				</div>
				<button
					onClick={scrollTop}
					className="flex absolute hover-scale text-primary top-2 bg-accent2  rounded-lg py-2 px-4  right-2"
				>
					Top <ArrowUp className="animate-bounce ml-2" />
				</button>
			</motion.div>
			<div className="absolute bottom-0 overflow-hidden">
				<h1 className=" text-black/45 font-extrabold text-5xl">
					NitinDevSpace
				</h1>
			</div>
		</div>
	);
}

export default Footer;
