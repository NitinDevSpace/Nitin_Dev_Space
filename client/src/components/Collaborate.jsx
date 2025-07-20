import { easeInOut, motion } from "framer-motion";
import { Mail } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

function Collaborate() {
	const navigate = useNavigate();
	return (
		<div className="relative my-4 overflow-hidden flex flex-col gap-6 w-11/12 h-screen items-center justify-center mx-auto">
			<h1 className=" text-3xl sm:text-5xl">
				<motion.span
					initial={{ opacity: 0, x: 200 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, ease: easeInOut }}
				>
					Ready to{" "}
				</motion.span>
				<span className="text-accent2 font-sans">
					<Typewriter
						words={["Collaborate"]}
						loop={1}
						deleteSpeed={0}
						cursor
						cursorStyle=""
						typeSpeed={90}
					/>
				</span>

				<span className="animate-pulse">?</span>
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

export default Collaborate;
