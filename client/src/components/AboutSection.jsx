import React from "react";
import { motion } from "framer-motion";

function AboutSection() {
	return (
		<div className="realtive shadow-2xl flex flex-col w-11/12 gap-16 h-full items-center justify-center mx-auto gradient-bg">
			<div className="flex flex-col w-1/3 text-center">
				<span className="text-3xl pb-6 font-semibold">
					A Little <span className="text-accent2">About Me </span>
				</span>
				<span className="font-light opacity-70 ">
					I'm a dedicated Full-Stack Developer passionate about building robust,
					scalable applications and creating seamless user experiences. I thrive
					in collaborative environments and am always eager to learn and adapt
					to new technologies.
				</span>
			</div>
			<div className="flex w-1/2  text-center  gap-12 space-out items-center">
				<div className="w-1/3 hover:scale-105 transition-transform duration-300 min-h-[18rem] border border-gray-400/30 bg-gray-900/40 justify-start items-center flex flex-col gap-3 rounded-lg p-6">
					<i className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto">
						icon
					</i>
					<h1 className="text-lg font-semibold">Frontend Development</h1>
					<p className="text-sm font-light opacity-70">
						Crafting responsive user interfaces with key technologies like{" "}
						<strong>React</strong>, <strong>Next.js</strong>, and{" "}
						<strong>JavaScript</strong>, focusing on performance and{" "}
						<strong>Tailwind CSS</strong> to delight users.
					</p>
				</div>
				<div className="w-1/3 hover:scale-105 transition-transform duration-300 min-h-[18rem] border border-gray-400/30 bg-gray-900/40 justify-start items-center flex flex-col gap-3 rounded-lg p-6">
					<i className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto">
						icon
					</i>
					<h1 className="text-lg font-semibold">Backend Architecture</h1>
					<p className="text-sm font-light opacity-70">
						Building secure, scalable server-side applications and APIs using
						Node.js, Python (Django/Flask), and Firebase, with expertise in
						databases like PostgreSQL & MongoDB.
					</p>
				</div>
				<div className="w-1/3 hover:scale-105 transition-transform duration-300 min-h-[18rem] border border-gray-400/30 bg-gray-900/40 justify-start items-center flex flex-col gap-3 rounded-lg p-6">
					<i className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto">
						icon
					</i>
					<h1 className="text-lg font-semibold">AI Integration</h1>
					<p className="text-sm font-light opacity-70">
						Exploring the exciting world of AI using Genkit and Python,
						integrating intelligent features and LLMs to create smarter, more
						intuitive applications.
					</p>
				</div>
			</div>
			<motion.button
				className="relative hover:scale-105 overflow-hidden border-2 border-accent2 rounded-lg py-3 px-5 text-white"
				whileHover="hover"
				initial="rest"
				animate="rest"
			>
				<motion.span
					variants={{
						rest: { width: 0 },
						hover: { width: "100%" },
					}}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="absolute top-0 left-0 h-full bg-accent2 z-0"
				/>
				<span className="relative z-10">Explore My Resume -&gt;</span>
			</motion.button>
		</div>
	);
}

export default AboutSection;
