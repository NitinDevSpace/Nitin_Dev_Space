import React, { useEffect, useState } from "react";
import { useInView, motion, easeInOut } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FolderGit2, User } from "lucide-react";
import { useRef } from "react";
import { getIntro } from "../../services/intro.service";
import Loading from "../../components/Loading";

function IntroSection() {
	const navigate = useNavigate();
	const imageRef = useRef(null);
	const textRef = useRef(null);
	const buttonRef = useRef(null);
	const buttonRef2 = useRef(null);
	const isImageInView = useInView(imageRef, { once: false, threshold: 0.5 });
	const isTextInView = useInView(textRef, { once: false, threshold: 0.5 });
	const isButtonInView = useInView(buttonRef, { once: false, threshold: 0.3 });
	const isButtonInView2 = useInView(buttonRef2, {
		once: false,
		threshold: 0.3,
	});

	const [intro, setIntro] = useState(null);
	const [loading, setLoading] = useState(false);

	const getData = async () => {
		try {
			setLoading(true);
			const res = await getIntro();
			if (!res) {
				console.log("Error fetching");
			}
			setIntro(res.data);
			setLoading(false);
		} catch (error) {
			console.error(
				"HTTP error fetching intro:",
				error.response?.status,
				error.message
			);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="relative my-4 overflow-hidden flex flex-col flex-wrap sm:w-11/12 min-h-[75vh] sm:min-h-screen justify-center mx-auto ">
			<motion.div
				ref={imageRef}
				initial={false}
				animate={isImageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 150 }}
				transition={{ duration: 1, ease: easeInOut }}
				className="absolute md:visible invisible mt-36 w-1/4 right-36 z-20"
			>
				{loading ? (
					<motion.div
						className="w-full h-auto rounded-xl right-5  bottom-4 relative z-20"
						animate={{ y: [0, -10, 0] }}
						transition={{ duration: 2, repeat: Infinity }}
					>
						<div className="overflow-hidden">
							<Loading />
						</div>
					</motion.div>
				) : (
					<motion.img
						src={intro ? intro.imageUrl : null}
						alt="Developer Image"
						className="w-full h-auto rounded-xl right-5  bottom-4 relative z-20"
						animate={{ y: [0, -10, 0] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
				)}
				{/* Glow div behind image, follows same size */}
				<div className="absolute inset-0  z-10 rounded-xl bg-gradient-to-t to-accent1 from-accent2/70 shadow-[0_0_30px_#e1b666ff]"></div>
			</motion.div>
			<motion.div
				ref={textRef}
				initial={false}
				animate={isTextInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -150 }}
				transition={{ duration: 1, ease: easeInOut }}
				className="flex flex-col w-full md:w-3/5 justify-start text-left pb-12 px-5 sm:px-16"
			>
				<h1 className="text-3xl md:text-4xl lg:text-6xl font-bold font-serif mb-6">
					Hi, I'm <span className="text-accent2">Nitin Kumar</span>
				</h1>
				<p className="text-base sm:text-xl  mb-6">
					Software Engineer <span className="text-accent2 text-2xl">//</span>{" "}
					Full Stack Developer <span className="text-accent2 text-2xl">//</span>{" "}
					AI Enthusiast
				</p>
				{intro?.bio && (
					<div
						className="text-base text-gray-200"
						dangerouslySetInnerHTML={{ __html: intro.bio }}
					/>
				)}
			</motion.div>

			<div className="flex flex-col justify-start sm:flex-row px-16  gap-8 lg:gap-16">
				<motion.button
					ref={buttonRef}
					initial={{ opacity: 0, y: 0, visibility: "hidden" }}
					animate={
						isButtonInView
							? { opacity: 1, y: 0, visibility: "visible" }
							: { opacity: 0, y: 0, visibility: "hidden" }
					}
					transition={{ duration: 1, delay: 0.5, ease: easeInOut }}
					onClick={() => {
						navigate("/projects");
					}}
					className="bg-accent2 flex gap-4 px-8 hover-scale text-black py-3 rounded-xl"
				>
					<FolderGit2 />
					My Creations
				</motion.button>
				<motion.button
					ref={buttonRef2}
					initial={{ opacity: 0, y: 0, visibility: "hidden" }}
					animate={
						isButtonInView2
							? { opacity: 1, y: 0, visibility: "visible" }
							: { opacity: 0, y: 0, visibility: "hidden" }
					}
					transition={{ duration: 1, delay: 0.8, ease: easeInOut }}
					onClick={() => {
						navigate("/profile");
					}}
					className="border-2 flex gap-4 px-8 py-3 hover-scale rounded-xl border-accent2"
				>
					<User />
					About Me
				</motion.button>
			</div>
		</div>
	);
}

export default IntroSection;
