import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Code, Layers, Sparkles } from "lucide-react";

function AboutSection() {
	const navigate = useNavigate();
	return (
		<div className="realtive rounded-lg my-4 overflow-hidden shadow-2xl flex flex-col sm:w-11/12 sm:gap-16 sm:min-h-full  p-6 items-center justify-center mx-auto gradient-bg">
			<div className="flex flex-col lg:w-[45rem] text-center">
				<span className="text-3xl pb-6 font-semibold">
					A Little <span className="text-accent2">About Me </span>
				</span>
				<span className="font-light text-sm sm:text-lg opacity-70 ">
					I'm a dedicated Software Engineer passionate about building robust,
					scalable applications and creating seamless user experiences. I thrive
					in collaborative environments and am always eager to learn and adapt
					to new technologies.
				</span>
			</div>
			<div className="flex flex-row flex-wrap justify-center p-6 gap-6 w-full  text-center space-out items-center">
				<div className="w-[19rem] hover:scale-105 transition-transform duration-300 overflow-hidden h-[20rem] border border-gray-400/30 bg-gray-900/40 justify-start items-center flex flex-col gap-3 rounded-lg p-6">
					<i className="bg-black/30 text-accent2 mb-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
						<Code className="scale-150" />
					</i>
					<h1 className="text-lg font-semibold">Frontend Development</h1>
					<p className="text-sm font-light opacity-70">
						Crafting responsive user interfaces with key technologies like{" "}
						<strong className="text-accent2 font-bold">React</strong>,{" "}
						<strong className="text-accent2 font-bold">Next.js</strong>, and{" "}
						<strong className="text-accent2 font-bold">JavaScript</strong>,
						focusing on performance and{" "}
						<strong className="text-accent2 font-bold">Tailwind CSS</strong> to
						delight users.
					</p>
				</div>
				<div className="w-[19rem]  hover:scale-105 transition-transform duration-300 overflow-hidden h-[20rem] border border-gray-400/30 bg-gray-900/40 justify-start items-center flex flex-col gap-3 rounded-lg p-6">
					<i className="bg-black/30 text-accent2 mb-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
						<Layers className="scale-150" />
					</i>
					<h1 className="text-lg font-semibold">Backend Architecture</h1>
					<p className="text-sm font-light opacity-70">
						Building secure, scalable server-side applications and APIs using
						<strong className="text-accent2 font-bold"> Node.js</strong>,
						<strong className="text-accent2 font-bold"> Python </strong>
						(Django/Flask), and{" "}
						<strong className="text-accent2 font-bold">Firebase</strong> , with
						expertise in databases like{" "}
						<strong className="text-accent2 font-bold">PostgreSQL</strong>, &{" "}
						<strong className="text-accent2 font-bold">MongoDB</strong> .
					</p>
				</div>
				<div className="w-[19rem]  hover:scale-105 transition-transform duration-300 overflow-hidden h-[20rem] border border-gray-400/30 bg-gray-900/40 justify-start items-center flex flex-col gap-3 rounded-lg p-6">
					<i className="bg-black/30 text-accent2 mb-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
						<Sparkles className="scale-150" />
					</i>
					<h1 className="text-lg font-semibold">AI Integration</h1>
					<p className="text-sm font-light opacity-70">
						Exploring the exciting world of AI using{" "}
						<strong className="text-accent2 font-bold">Genkit </strong>
						and <strong className="text-accent2 font-bold">Python</strong>,
						integrating intelligent features and{" "}
						<strong className="text-accent2 font-bold">LLMs</strong> to create
						smarter, more intuitive applications.
					</p>
				</div>
			</div>
			<motion.button
				className="relative hover-scale overflow-hidden border-2 border-accent2 rounded-lg py-3 px-5 text-white hover:text-black"
				whileHover="hover"
				initial="rest"
				animate="rest"
				onClick={() => {
					navigate("/profile");
				}}
			>
				<motion.span
					variants={{
						rest: { width: 0 },
						hover: { width: "100%" },
					}}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="absolute top-0 left-0 h-full bg-accent2 z-0"
				/>
				<span className="relative z-10">
					Explore My Resume <span className="font-mono">-&gt;</span>
				</span>
			</motion.button>
		</div>
	);
}

export default AboutSection;
