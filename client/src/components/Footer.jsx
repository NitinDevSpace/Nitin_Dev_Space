import React from "react";
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

	return (
		<div className="relative my-2 justify-self-center shadow-2xl py-12 flex flex-col justify-center w-11/12 h-screen items-center">
			<div className="border flex  bg-white text-black my-12 py-3 sm:py-6 px-4 sm:px-12 rounded-lg shadow-2xl w-5/6  justify-center h-1/2 items-center">
				<div className="w-full">
					<div className="border-b-2 justify-between flex flex-col xl:flex-row">
						<div className="flex gap-4 mb-4 flex-col">
							<div className="flex">
								<img
									src={logo}
									alt="logo"
									className="w-12 h-12 bg-black rounded-lg p-2"
								/>
								<h1 className="p-2 text-bold text-2xl ">Nitin Dev Space</h1>
							</div>
							<p>
								Passionate about building innovative web solutions and exploring{" "}
								<br />
								the frontiers of AI. Let's connect and create something <br />
								impactful.
							</p>
						</div>
						<div className=" items-center flex flex-col justify-center flex-wrap gap-6 left-1/2 ">
							<div className=" items-center flex justify-center flex-wrap gap-4 left-1/2">
								<button
									onClick={() =>
										openNewWindow("https://github.com/NitinDevSpace")
									}
									className="bg-black/90 text-white rounded-full scale-125 p-2"
								>
									<Github />{" "}
								</button>
								<button
									onClick={() =>
										openNewWindow("https://www.linkedin.com/in/nitindevspace/")
									}
									className="bg-black/90 text-white rounded-full scale-125 p-2"
								>
									<Linkedin />{" "}
								</button>
								<button
									onClick={() =>
										openNewWindow("https://leetcode.com/u/NitinDevSpace/")
									}
									className="bg-black/90 text-white rounded-full scale-125 p-2"
								>
									<Code />{" "}
								</button>
								<button
									onClick={() =>
										openNewWindow(
											"https://www.hackerrank.com/profile/nitindevspace"
										)
									}
									className="bg-black/90 text-white rounded-full scale-125 p-2"
								>
									<Braces />{" "}
								</button>
								<button
									onClick={() =>
										openNewWindow("https://www.instagram.com/creative_core_23/")
									}
									className="bg-black/90 text-white rounded-full scale-125 p-2"
								>
									{" "}
									<Instagram />{" "}
								</button>
								<button
									onClick={openEmailClient}
									className="bg-black/90 text-white rounded-full scale-125 p-2"
								>
									{" "}
									<Mail />{" "}
								</button>
							</div>
							<h1 className="text-lg">Socials</h1>
						</div>
						<ul className="flex flex-col gap-3 p-12">
							<li>
								<Link to={"/"}>Home</Link>
							</li>
							<li>
								<Link to={"/profile"}>About Me</Link>
							</li>
							<li>
								<Link to={"/profile"}>Projects </Link>
							</li>
							<li>
								<Link to={"/profile"}>Blogs</Link>
							</li>
							<li>
								<Link to={"/profile"}>Contact Me</Link>
							</li>
						</ul>
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
			</div>
			<button
				onClick={scrollTop}
				className="flex absolute  text-black bg-white  rounded-lg py-2 px-4  right-5"
			>
				Top <ArrowUp className="animate-bounce ml-2" />
			</button>
			<div className="absolute bottom-0 overflow-hidden">
				<h1 className=" text-black/45 font-extrabold text-5xl">
					NitinDevSpace
				</h1>
			</div>
		</div>
	);
}

export default Footer;
