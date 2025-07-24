import React, { useEffect, useRef, useState } from "react";
import { easeInOut, motion, spring, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Code, Layers, Sparkles } from "lucide-react";
import { getAboutme } from "../../services/aboutMe.service";

function AboutSection() {
	const navigate = useNavigate();
	const textRef = useRef(null);
	const boxRef = useRef(null);
	const buttonRef = useRef(null);
	const isTextInView = useInView(textRef, { once: false, threshold: 0.4 });
	const isBoxInView = useInView(boxRef, { once: false, threshold: 0.9 });
	const isButtontInView = useInView(buttonRef, { once: false, threshold: 0.4 });

	const [about, setAbout] = useState({});

	const getData = async () => {
		try {
			const res = await getAboutme();
			if (!res) {
				console.log("Erroe fetching About me");
			}
			setAbout(res.data);
		} catch (error) {
			console.error(
				"HTTP error fetching intro:",
				error.response?.status,
				error.message
			);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<motion.div
			layout
			className="relative  my-4 overflow-hidden  flex flex-col sm:w-11/12 sm:gap-16 sm:min-h-screen  p-6 items-center justify-center mx-auto "
		>
			<motion.div
				layout
				ref={textRef}
				initial={false}
				animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.5, ease: easeInOut }}
				className="flex flex-col lg:w-[45rem] text-center"
			>
				<span className="text-3xl pb-6 font-semibold">
					A Little <span className="text-accent2">About Me </span>
				</span>
				{/* {Para} */}
				<span className="font-light text-sm sm:text-lg opacity-70 ">
					{about.para}
				</span>
			</motion.div>
			<motion.div
				ref={boxRef}
				className="flex flex-row flex-wrap justify-center p-6 gap-6 w-full text-center space-out items-center"
			>
				{/* Frontend */}
				<motion.div
					layout
					animate={{
						height: isBoxInView ? "20rem" : "7rem",
						width: isBoxInView ? "18.5rem" : "7rem",
					}}
					transition={{ duration: 1, delay: 0.1, type: "spring" }}
					className="w-[19rem] hover:scale-105 transition-transform duration-300 overflow-hidden border border-gray-400/30 bg-primary2 justify-start items-center flex flex-col gap-3 rounded-lg p-6"
				>
					<i className="bg-black/30 text-accent2 mb-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
						<Code className="scale-150" />
					</i>

					<motion.h1 layout className="text-lg font-semibold">
						Frontend Development
					</motion.h1>
					<p
						className="text-sm font-light opacity-70"
						dangerouslySetInnerHTML={{ __html: about.frontend }}
					/>
				</motion.div>
				{/* Backend */}
				<motion.div
					layout
					animate={{
						height: isBoxInView ? "20rem" : "7rem",
						width: isBoxInView ? "18.5rem" : "7rem",
					}}
					transition={{ duration: 1, delay: 0.1, type: "spring" }}
					className="w-[19rem]  hover:scale-105 transition-transform duration-300 overflow-hidden border border-gray-400/30 bg-primary2 justify-start items-center flex flex-col gap-3 rounded-lg p-6"
				>
					<i className="bg-black/30 text-accent2 mb-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
						<Layers className="scale-150" />
					</i>

					<h1 className="text-lg font-semibold">Backend Architecture</h1>
					<p
						className="text-sm font-light opacity-70"
						dangerouslySetInnerHTML={{ __html: about.backend }}
					/>
				</motion.div>
				{/* AI */}
				<motion.div
					layout
					animate={{
						height: isBoxInView ? "20rem" : "7rem",
						width: isBoxInView ? "18.5rem" : "7rem",
					}}
					transition={{ duration: 1, delay: 0.1, type: "spring" }}
					className="w-[19rem]  hover:scale-105 transition-transform duration-300 overflow-hidden border border-gray-400/30 bg-primary2 justify-start items-center flex flex-col gap-3 rounded-lg p-6"
				>
					<i className="bg-black/30 text-accent2 mb-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
						<Sparkles className="scale-150" />
					</i>

					<h1 className="text-lg font-semibold">AI Integration</h1>
					<p
						className="text-sm font-light opacity-70"
						dangerouslySetInnerHTML={{ __html: about.ai }}
					/>
				</motion.div>
			</motion.div>
			<motion.button
				ref={buttonRef}
				className="relative hover-scale overflow-hidden border-2 border-accent2 rounded-lg py-3 px-5 text-white hover:text-black"
				whileHover="hover"
				initial={false}
				animate={isButtontInView ? { opacity: 1 } : { opacity: 0 }}
				transition={{ duration: 0.7, ease: easeInOut }}
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
		</motion.div>
	);
}

export default AboutSection;
