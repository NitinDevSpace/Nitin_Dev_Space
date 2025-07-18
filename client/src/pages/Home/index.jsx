import React from "react";
import NavBar from "../../components/NavBar";
import BioSection from "../../components/BioSection";
import AboutSection from "../../components/AboutSection";
import MyCreations from "../../components/MyCreations";
import Footer from "../../components/Footer";
import Collaborate from "../../components/Collaborate";
import RotatingCubeScene from "../../components/3D/RotatingCubeScene";
import { easeIn, easeInOut, easeOut, motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
	return (
		<>
			<div className="realtive overflow-hidden shadow-2xl relative sm:w-11/12 h-full items-center justify-center mx-auto sm:mt-4 gradient-bg2">
				<div className="absolute inset-0 z-10 flex items-start justify-start pointer-events-none">
					<RotatingCubeScene />
				</div>
				<NavBar />
			</div>

			<motion.h1
				className="absolute z-30 left-1/2 w-full bottom-36 flex flex-col items-center  text-white"
				initial={{ opacity: 0, y: 80, x: "-50%" }}
				animate={{ opacity: 1, y: 0, x: "-50%" }}
				transition={{ duration: 1, ease: easeInOut }}
			>
				<span className="md:text-8xl text-5xl  font-extrabold text-center mb-4">
					Nitin <span className="text-[#00FFFF] ">Dev Space</span>
				</span>
			</motion.h1>
			<motion.p
				className="absolute w-full  z-30 left-1/2 bottom-28 flex flex-col items-center text-white"
				initial={{ opacity: 0,  x: "-50%" }}
				animate={{ opacity: 1,  x: "-50%" }}
				transition={{ duration: 2, ease: easeInOut }}
			>
				<span className="text-sm md:text-lg lg:text-2xl font-mono text-center">
					<Typewriter
						words={["Crafting interactive, performant experiences"]}
						loop={1}
						deleteSpeed={0}
						cursor
						cursorStyle="."
						typeSpeed={90}
					/>
				</span>
			</motion.p>
			<BioSection />
			<AboutSection />
			<MyCreations />
			<Collaborate />
			<Footer />
		</>
	);
};

export default Home;
