import { Mail } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Collaborate() {
	const navigate = useNavigate();
  return (
		<div className="realtive rounded-lg my-4 overflow-hidden flex flex-col shadow-2xl gap-6 w-11/12 h-2/3 items-center justify-center mx-auto gradient-bg">
			<h1 className=" text-3xl sm:text-5xl">
				Ready to <span className="text-accent2 font-sans">Collaborate</span>?
			</h1>
			<p className="text-center opacity-70 text-thin">
				I'm always excited to discuss new projects, innovative ideas, or
				potential collaborations. <br /> If you have something in mind, or just
				want to connect, feel free to reach out!
			</p>
			<button
				onClick={() => {
					navigate("/contact");
				}}
				className="bg-accent2 flex gap-4 p-2 hover-scale px-6 rounded-lg text-black m-4"
			>
				Get In Touch <Mail />
			</button>
		</div>
	);
}

export default Collaborate