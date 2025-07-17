import React from "react";
import NavBar from "../../components/NavBar";
import model from "../../assets/model.png";
import BioSection from "../../components/BioSection";
import AboutSection from "../../components/AboutSection";
import MyCreations from "../../components/MyCreations";
import Footer from "../../components/Footer";
import Collaborate from "../../components/Collaborate";
import RotatingCubeScene from "../../components/RotatingCubeScene";

const Home = () => {
	return (
		<>
					<div className="absolute inset-0 z-20 flex items-start justify-start pointer-events-none">
						<RotatingCubeScene />
					</div>
			<div className="realtive shadow-2xl relative w-11/12 h-full items-center justify-center mx-auto mt-4 gradient-bg">
				<NavBar />
				<div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center justify-center w-full max-w-xl mx-auto">
					<img
						src={model}
						alt="centre model"
						className=" w-4/5 h-4/5 bottom-0 object-contain"
					/>
				</div>
				<div className="absolute left-1/2 -translate-x-1/2 bottom-36 flex flex-col items-center text-white">
					<h1 className="text-8xl font-extrabold text-center mb-4">
						Nitin <span className="text-[#00FFFF] ">Dev Space</span>
					</h1>
					<p className="text-2xl font-bold font-mono text-center">
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
