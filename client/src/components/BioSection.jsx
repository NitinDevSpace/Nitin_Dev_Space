import React from "react";
import me from "../assets/my.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function BioSection() {
	const navigate = useNavigate();
	return (
		<div className="realtive rounded-lg my-4  overflow-hidden flex flex-col flex-wrap shadow-2xl sm:w-11/12 min-h-[75vh] sm:min-h-[95vh] justify-center mx-auto ">
			<div className="absolute md:visible invisible w-1/4 right-36 z-20">
				<motion.img
					src={me}
					alt="Developer Image"
					className="w-full h-auto rounded-xl right-6 bottom-6 relative z-20"
					animate={{ y: [0, -10, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
				/>

				{/* Glow div behind image, follows same size */}
				<div className="absolute inset-0  z-10 rounded-xl bg-gradient-to-t to-accent2 from-primary shadow-[0_0_30px_rgba(160,60,207,0.6)]"></div>
			</div>
			<div className="flex flex-col w-full md:w-3/5 justify-center text-left pb-12 px-5 sm:px-16">
				<h1 className="text-3xl md:text-4xl lg:text-6xl font-bold font-serif mb-6">
					Hi, I'm <span className="text-accent2">Nitin Kumar</span>
				</h1>
				<p className="text-base sm:text-xl  mb-6">
					Software Engineer <span className="text-accent2 text-2xl">//</span>{" "}
					Full Stack Developer <span className="text-accent2 text-2xl">//</span>{" "}
					AI Enthusiast
				</p>
				<p className="sm:text-sm font-thin opacity-70">
					I craft innovative and user-centric web applications, bringing ideas
					to life with clean code and elegant design. Currently exploring the
					exciting possibilities of AI integration.
				</p>
			</div>
			<div className="flex flex-col sm:flex-row px-12 lg:pl-32 gap-8 lg:gap-16">
				<button
					onClick={() => {
						navigate("/projects");
					}}
					className="bg-accent2 px-8 hover-scale text-black py-3 rounded-xl"
				>
					My Creations
				</button>
				<button
					onClick={() => {
						navigate("/profile");
					}}
					className="border-2 px-8 py-3 hover-scale rounded-xl border-accent2"
				>
					About Me
				</button>
			</div>
		</div>
	);
}

export default BioSection;
