import { easeInOut, motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

function Collaborate() {
	const navigate = useNavigate();
	const textRef = useRef(null);
	const buttonRef = useRef(null);
	const paraRef = useRef(null);
	const isTextInView = useInView(textRef, { once: false, threshold: 0.5 });
	const isParaInView = useInView(paraRef, { once: false, threshold: 0.5 });
	const isButtonInView = useInView(buttonRef, { once: false, threshold: 0.5 });

	const [typeWriterKey, setTypeWriterKey] = useState(0);

	useEffect(() => {
		if (isTextInView) {
			setTypeWriterKey((prev) => prev + 1);
		}
	}, [isTextInView]);

	return (
		<div className="relative my-4 overflow-hidden flex flex-col gap-6 md:gap-16 w-11/12 h-screen items-center  justify-center mx-auto">
			<h1 ref={textRef} className="text-3xl md:scale-150 sm:text-5xl">
				<motion.span
					initial={false}
					animate={
						isTextInView ? { opacity: 1, x: 200 } : { opacity: 0, x: 200 }
					}
					transition={{ duration: 1, ease: easeInOut }}
				>
					Ready to{" "}
				</motion.span>
				<span className="text-accent2 md:scale-150 font-sans">
					<Typewriter
						key={typeWriterKey}
						words={["Collaborate"]}
						loop={1}
						deleteSpeed={0}
						typeSpeed={90}
					/>
				</span>

				<span className="animate-pulse">?</span>
			</h1>
			<div
				ref={paraRef}
				className="text-center opacity-70 md:scale-150 overflow-hidden text-thin"
			>
				<motion.p
					initial={false}
					animate={isParaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
					transition={{ duration: 1, ease: easeInOut }}
				>
					I'm always excited to discuss new projects, innovative ideas, or
					potential collaborations. <br /> If you have something in mind, or
					just want to connect, feel free to reach out!
				</motion.p>
			</div>

			<motion.button
				ref={buttonRef}
				initial={false}
				animate={isButtonInView ? { opacity: 1 } : { opacity: 0 }}
				transition={{ duration: 1, delay: 0.3, ease: easeInOut }}
				onClick={() => {
					navigate("/contact");
				}}
				className="bg-accent2 flex gap-4 md:scale-150 p-2 hover-scale px-6 rounded-lg text-black m-4"
			>
				Get In Touch <Mail />
			</motion.button>
		</div>
	);
}

export default Collaborate;
