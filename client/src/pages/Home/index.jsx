import React from "react";
import NavBar from "../../components/NavBar";
import BioSection from "../../components/BioSection";
import AboutSection from "../../components/AboutSection";
import MyCreations from "../../components/MyCreations";
import Footer from "../../components/Footer";
import Collaborate from "../../components/Collaborate";
import RotatingCubeScene from "../../components/RotatingCubeScene";

const Home = () => {
	return (
		<>
			<div className="realtive shadow-2xl relative w-11/12 h-full items-center justify-center mx-auto mt-4 gradient-bg">
				<div className="absolute inset-0 z-10 flex items-start justify-start pointer-events-none">
					<RotatingCubeScene />
				</div>
				<NavBar />

				<div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-36 flex flex-col items-center text-white">
					<h1 className="text-8xl font-extrabold text-center mb-4">
						Nitin <span className="text-[#00FFFF] ">Dev Space</span>
					</h1>
					<p className="text-2xl  font-mono text-center">
						Crafting interactive, performant experiences.
					</p>
				</div>
			</div>
			<BioSection />
			<AboutSection />
			<MyCreations />
			<Collaborate />
			<Footer />
		</>
	);
};

export default Home;
