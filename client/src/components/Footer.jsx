import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Footer() {
	return (
		<div className="relative rounded-lg my-2 justify-self-center shadow-2xl py-12 flex flex-col w-11/12 min-h-1/3 items-center bg-white/80">
			<div className="border flex bg-white text-black my-12 py-3 sm:py-6 px-4 sm:px-12 rounded-lg shadow-2xl w-5/6  justify-center h-full items-center">
				<div className="w-full">
					<div className="border-b-2 justify-between flex">
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
						<div className="absolute items-center left-1/2 py-12">
							<i>github </i>
							<i>linkedin </i>
							<i>Leetcode </i>
							<i>HackerRank </i>
							<i> Insta </i>
							<i> Email </i>
							<h1>Socials</h1>
						</div>
						<ul className="flex flex-col gap-3 p-12">
							<li>About Me</li>
							<li>Projects</li>
							<li>Blogs</li>
							<li>Contact Me</li>
						</ul>
					</div>
					<div className="flex mt-6 font-thin opacity-60 text-sm justify-between">
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
			<div className="absolute bottom-0 overflow-hidden">
				<h1 className=" text-black/45 font-extrabold text-5xl">
					NitinDevSpace
				</h1>
			</div>
		</div>
	);
}

export default Footer;
