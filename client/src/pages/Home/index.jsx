import React from "react";
import NavBar from "../../components/NavBar";
import model from "../../assets/model.png";

const Home = () => {
	return (
		<>
			<div className="realtive shadow-2xl relative w-4/5 h-full items-center justify-center mx-auto my-16 gradient-bg">
				<NavBar className="sticky" />
				<div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center justify-center w-full max-w-xl mx-auto">
					<img
						src={model}
						alt="centre model"
						className=" w-4/5 h-4/5 bottom-0 object-contain"
					/>
				</div>
				<div className="absolute left-1/2 -translate-x-1/2 bottom-36 flex flex-col items-center text-white">
					<h1 className="text-8xl font-extrabold text-center mb-4">
						Nitin Dev Space
					</h1>
					<p className="text-4xl font-bold text-center">
						Crafting interactive, performant experiences.
					</p>
				</div>
			</div>
		</>
	);
};

export default Home;
