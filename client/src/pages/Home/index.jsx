import React from "react";

const Home = () => {
	return (
		<div className="min-h-screen flex items-center bg-gradient-to-br from-accent1 via-primary to-accent2">
			<div className="w-full max-w-content px-4">
				<h1 className="text-4xl md:text-6xl font-heading text-center mb-8">
					Nitin Dev Space
				</h1>
				<p className="text-center text-lg md:text-xl font-body">
					Crafting interactive, performant experiences.
				</p>
				{/* 3D Centerpiece will go here */}
			</div>
		</div>
	);
};

export default Home;
