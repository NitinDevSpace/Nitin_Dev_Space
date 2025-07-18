import React from "react";
import me from "../assets/my.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function BioSection() {
	const navigate = useNavigate();
	return (
		<div className="realtive flex flex-col flex-wrap shadow-2xl relative w-11/12 h-[90vh] justify-center mx-auto ">
			<div className="absolute w-1/4 right-36 z-20">
				<motion.img
					src={me}
					alt="Developer Image"
					className="w-full h-auto rounded-xl right-6 bottom-6 relative z-20"
					animate={{ y: [0, -10, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
				/>

				{/* Glow div behind image, follows same size */}
				<div className="absolute inset-0  z-10 rounded-xl bg-gradient-to-r to-[#f7ba2b] from-[#ea5358] shadow-[0_0_30px_rgba(160,60,207,0.6)]"></div>
			</div>
			<div className="flex flex-col w-1/2 justify-center text-left pb-12 px-16">
				<h1 className="text-6xl font-bold font-serif mb-6">
					Hi, I'm <span className="text-accent2">Nitin Kumar</span>
				</h1>
				<span className="text-xl  mb-6">
					Software Engineer <span className="text-accent2 text-2xl">//</span>{" "}
					Full Stack Developer{" "}
					<span className="text-accent2 text-2xl">//</span> AI Enthusiast
				</span>
				<span className="text-sm">
					I craft innovative and user-centric web applications, bringing ideas
					to life with clean code and elegant design. Currently exploring the
					exciting possibilities of AI integration.
				</span>
			</div>
			<div className="flex pl-32 gap-16">
				<button
					onClick={() => {
						navigate("/projects");
					}}
					className="bg-accent2 px-8 py-3 rounded-xl"
				>
					My Creations
				</button>
				<button
					onClick={() => {
						navigate("/profile");
					}}
					className="border-2 px-8 py-3 rounded-xl border-accent2"
				>
					About Me
				</button>
			</div>
		</div>
	);
}

export default BioSection;
