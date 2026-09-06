import React, { useEffect } from "react";
import IntroSection from "./IntroSection";
import ALittleAboutMe from "./ALittileAboutMe";
import MyCreations from "./MyCreationsSection";
import Collaborate from "./CollaborateSection";
import Footer from "../../components/Footer";
import RotatingCubeScene from "../../components/3D/RotatingCubeScene";
import {
	easeInOut,
	easeOut,
	motion,
} from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, []);

	return (
		<>
			<section className="relative">
				<div className="relative overflow-hidden h-screen gradient-bg items-center justify-center mx-auto ">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: easeInOut }}
						className="absolute inset-0 z-10 flex items-start justify-start pointer-events-none"
					>
						<RotatingCubeScene />
					</motion.div>
					<motion.h1
						className="absolute z-30 left-1/2 w-full bottom-[22%] sm:bottom-36 flex flex-col items-center text-white"
						initial={{ opacity: 0, y: 36, x: "-50%" }}
						animate={{ opacity: 1, y: 0, x: "-50%" }}
						transition={{ duration: 0.7, ease: easeOut }}
					>
						<span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-center mb-4 px-3">
							Nitin <span className=" ">Dev Space</span>
						</span>
					</motion.h1>
					<motion.p
						className="absolute w-full z-30 left-1/2 bottom-[14%] sm:bottom-28 flex flex-col items-center text-accent2 px-3"
						initial={{ opacity: 0, x: "-50%" }}
						animate={{ opacity: 1, x: "-50%" }}
						transition={{ duration: 0.8, ease: easeInOut }}
					>
						<span className="text-sm md:text-lg lg:text-2xl font-mono text-center">
							<Typewriter
								words={["A software brand for custom products and freelance builds"]}
								loop={1}
								deleteSpeed={0}
								cursor
								cursorStyle="."
								typeSpeed={60}
							/>
						</span>
					</motion.p>
				</div>
			</section>
			<section>
				<IntroSection />
			</section>
			<section>
				<ALittleAboutMe />
			</section>
			<section>
				<MyCreations />
			</section>
			<section>
				<Collaborate />
			</section>
			<section>
				<Footer />
			</section>
		</>
	);
};

export default Home;
