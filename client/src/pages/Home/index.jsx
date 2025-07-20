import React, { useEffect, useRef } from "react";
import BioSection from "../../components/BioSection";
import AboutSection from "../../components/AboutSection";
import MyCreations from "../../components/MyCreations";
import Collaborate from "../../components/Collaborate";
import Footer from "../../components/Footer";
import RotatingCubeScene from "../../components/3D/RotatingCubeScene";
import { easeIn, easeInOut, easeOut, motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
	const sectionRefs = useRef([]);
	const currentSection = useRef(0);
	const isThrottled = useRef(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = sectionRefs.current.findIndex(
							(section) => section === entry.target
						);
						if (index !== -1) {
							currentSection.current = index;
						}
					}
				});
			},
			{ threshold: 0.5 }
		);

		sectionRefs.current.forEach((section) => {
			if (section) observer.observe(section);
		});

		const handleScroll = (e) => {
			e.preventDefault();
			if (isThrottled.current) return;
			if (Math.abs(e.deltaY) < 40) return;

			const direction = e.deltaY > 0 ? 1 : -1;
			const nextSection = Math.max(
				0,
				Math.min(
					sectionRefs.current.length - 1,
					currentSection.current + direction
				)
			);

			if (nextSection !== currentSection.current) {
				sectionRefs.current[nextSection]?.scrollIntoView({
					behavior: "smooth",
				});
				isThrottled.current = true;
				setTimeout(() => (isThrottled.current = false), 600);
			}
		};

		const handleKey = (e) => {
			if (isThrottled.current) return;
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				const direction = e.key === "ArrowDown" ? 1 : -1;
				const nextSection = Math.max(
					0,
					Math.min(
						sectionRefs.current.length - 1,
						currentSection.current + direction
					)
				);
				if (nextSection !== currentSection.current) {
					sectionRefs.current[nextSection]?.scrollIntoView({
						behavior: "smooth",
					});
					isThrottled.current = true;
					setTimeout(() => (isThrottled.current = false), 600);
				}
			}
		};

		window.addEventListener("wheel", handleScroll, { passive: false });
		window.addEventListener("keydown", handleKey);

		return () => {
			window.removeEventListener("wheel", handleScroll);
			window.removeEventListener("keydown", handleKey);
			sectionRefs.current.forEach((section) => {
				if (section) observer.unobserve(section);
			});
		};
	}, []);

	return (
		<AnimatePresence mode="wait">
			<section ref={(el) => (sectionRefs.current[0] = el)}>
				<div className="relative overflow-hidden h-screen gradient-bg items-center justify-center mx-auto ">
					<motion.div
						initial={{ opacity: 0, y: 90 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: easeInOut }}
						className="absolute inset-0 z-10 flex items-start justify-start pointer-events-none"
					>
						<RotatingCubeScene />
					</motion.div>
				</div>

				<motion.h1
					className="absolute z-30 left-1/2 w-full bottom-36 flex flex-col items-center  text-white"
					initial={{ opacity: 0, y: 80, x: "-50%" }}
					animate={{ opacity: 1, y: 0, x: "-50%" }}
					transition={{ delay: 0.5, duration: 1, ease: easeOut }}
				>
					<span className="md:text-8xl text-5xl  font-extrabold text-center mb-4">
						Nitin <span className=" ">Dev Space</span>
					</span>
				</motion.h1>
				<motion.p
					className="absolute w-full  z-30 left-1/2 bottom-28 flex flex-col items-center text-accent2"
					initial={{ opacity: 0, x: "-50%" }}
					animate={{ opacity: 1, x: "-50%" }}
					transition={{ duration: 2, delay: 0.7, ease: easeInOut }}
				>
					<span className="text-sm md:text-lg lg:text-2xl font-mono text-center">
						<Typewriter
							words={["Crafting interactive, performant experiences"]}
							loop={1}
							deleteSpeed={0}
							cursor
							cursorStyle="."
							typeSpeed={90}
						/>
					</span>
				</motion.p>
			</section>
			<section ref={(el) => (sectionRefs.current[1] = el)}>
				<BioSection />
			</section>
			<section ref={(el) => (sectionRefs.current[2] = el)}>
				<AboutSection />
			</section>
			<section ref={(el) => (sectionRefs.current[3] = el)}>
				<MyCreations />
			</section>
			<section ref={(el) => (sectionRefs.current[4] = el)}>
				<Collaborate />
			</section>
			<section ref={(el) => (sectionRefs.current[5] = el)}>
				<Footer />
			</section>
		</AnimatePresence>
	);
};

export default Home;
