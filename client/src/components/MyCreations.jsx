import React from "react";

function MyCreations() {
	return (
		<div className="realtive shadow-2xl overflow-hidden  sm:w-11/12 h-full flex flex-col gap-2 items-center justify-center mx-auto ">
			<div className="text-center mb-12"> 
				<h1 className="text-5xl font-bold mb-6">
					My <span className="text-[#A7DBDC]">Creations</span>
				</h1>
				<p>
					A selection of projects where I've turned ideas into reality,
					showcasing my skills in <br /> development and problem-solving.
				</p>
			</div>
			<div className="h-[32rem] min-w-[400px] w-5/6 bg-black">
				Crousel
			</div>
		</div>
	);
}

export default MyCreations;
