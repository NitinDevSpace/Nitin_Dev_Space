import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import {
	Briefcase,
	Calendar,
	Code,
	Codesandbox,
	Database,
	Download,
	GraduationCap,
	Lightbulb,
	MapPin,
	PenLine,
	Server,
	Settings,
	Star,
	UsersRound,
	Zap,
} from "lucide-react";

const About = () => {
	const [downloading, setDownloading] = useState(false);

	const downloadResume = () => {
		const fileUrl = "/Nitin_Resume.pdf";

		// Open in new tab
		window.open(fileUrl, "_blank");

		// Trigger download
		const link = document.createElement("a");
		link.href = fileUrl;
		link.download = "Nitin_Resume.pdf";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<>
			<section className="relative mx-auto  bg-primary flex  items-center justify-center">
				<div className="flex flex-col gap-12 bg-primary2 md:w-5/6 h-full mt-36 md:p-6 py-24 shadow-2xl items-center justify-center">
					{/* Top heading & Download Resume */}
					<div className="flex flex-col gap-6 p-4 mb-12 items-center">
						<h1 className="text-5xl font-semibold">
							My{" "}
							<span className="text-accent2 opacity-90">
								Professional Journey
							</span>
						</h1>
						<p className="font-thin  opacity-70">
							A detailed overview of my experience, skills, and educational
							background.
						</p>
						<button
							onClick={() => {
								setDownloading(true);
								downloadResume();
							}}
							disabled={downloading}
							className="flex gap-4 cursor-pointer justify-center bg-accent2 py-2 px-4  rounded text-black"
						>
							<Download /> {downloading ? "Downloading ..." : "Download Resume"}
						</button>
					</div>
					{/* Professional Experience */}
					<div className="bg-gray-900 w-4/5">
						<div className="flex flex-col space-y-1.5 border rounded-lg border-white/30">
							<div className="border-b border-white/20 w-full   p-5 sm:p-6 ">
								<h1 className="flex gap-3 font-semibold text-xl sm:text-2xl text-accent2 items-center">
									<Briefcase className="text-accent1 scale-125" /> Professional
									Experience
								</h1>
							</div>

							{/* Experiences */}
							<ul className="space-y-7 ml-6 border-l-2 border-accent2/60 sm:p-6">
								<li className="flex items-start gap-3">
									{/* Custom bullet */}
									<span className="mt-2 text-accent2 text-5xl leading-3">
										•
									</span>
									<div className="flex flex-col gap-2 mt-2">
										<div className="flex gap-1 items-center bg-accent1/30 w-fit p-1 rounded-lg text-xs text-white/50">
											<Calendar size={16} className="text-accent1/50" /> March
											2024 - Oct 2024
										</div>
										<div>
											<h3 className="text-lg sm:text-xl font-semibold">
												Graduate Engineer Trainee in Research & Development
											</h3>
											<div className="text-sm opacity-70 font-extralight my-2">
												<div className="flex gap-2">
													<div className="flex gap-2 items-center">
														<Briefcase size={16} /> YKK India Pvt. Ltd.
													</div>
													|
													<div className="flex gap-2 items-center">
														<MapPin size={16} /> Bawal, Haryana
													</div>
												</div>
											</div>
											<ul className="list-disc text-sm opacity-70 ml-4 font-extralight">
												<li>
													Led a small development team in designing and
													prototyped innovative solutions in R&D.
												</li>
												<li>
													Oversaw end-to-end development of key projects,
													balancing rapid prototyping with strategic planning.
												</li>
											</ul>
										</div>
									</div>
								</li>
								<li className="flex items-start gap-3">
									{/* Custom bullet */}
									<span className="mt-2 text-accent2 text-5xl leading-3">
										•
									</span>
									<div className="flex flex-col gap-2 mt-2">
										<div className="flex gap-1 items-center bg-accent1/30 w-fit p-1 rounded-lg text-xs text-white/50">
											<Calendar size={16} className="text-accent1/50" /> Approx.
											Early 2021 - Early 2024
										</div>
										<div>
											<h3 className="text-lg sm:text-xl font-semibold">
												Video Editor (Part-time/Freelance)
											</h3>
											<div className="text-sm opacity-70 font-extralight my-2">
												<div className="flex gap-2">
													<div className="flex gap-2 items-center">
														<Briefcase size={16} /> FreeLance
													</div>
													|
													<div className="flex gap-2 items-center">
														<MapPin size={16} /> Remote
													</div>
												</div>
											</div>
											<ul className="list-disc text-sm opacity-70 ml-4 font-extralight">
												<li>
													Leveraged 3 years of part-time experience producing
													and editing video content for diverse clients.
												</li>
												<li>
													Focused on promotional materials, tutorials, and
													social media content.
												</li>
											</ul>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>

					{/* Technical Proficiency */}
					<div className="bg-gray-900 w-4/5">
						<div className="flex flex-col space-y-1.5 border rounded-lg border-white/30">
							<div className="border-b border-white/20 w-full   p-5 sm:p-6 ">
								<h1 className="flex gap-3 font-semibold text-xl sm:text-2xl text-accent2 items-center">
									<Star className="text-accent1 scale-125" /> Technical
									Proficiency
								</h1>
							</div>
							{/* Skills Categories */}
							<div className="space-y-5 p-5 sm:p-6">
								<div className="flex flex-col gap-6 text-sm font-extralight ">
									<div>
										<span className="flex gap-4 text-lg mr-4 font-bold text-accent2 ">
											<Code strokeWidth={3} className="text-orange" />{" "}
											Programming Languages:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg bg-accent1/20 w-fit">
											Java, JavaScript, TypeScript, C++, Python
										</div>
									</div>
									<div>
										<span className="flex gap-4 text-lg mr-4 font-bold text-accent2 ">
											<Zap strokeWidth={2} className="text-orange" /> Web
											Technologies:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg bg-accent1/20 w-fit">
											React.js, Next.js, Node.js, HTML5, CSS3, RESTful APIs
										</div>
									</div>
									<div>
										<span className="flex gap-4 text-lg mr-4 font-bold text-accent2 ">
											<Server strokeWidth={2} className="text-orange" /> Backend
											Frameworks:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg bg-accent1/20 w-fit">
											Node.js, Express.js, Django (Python),Express.js, Firebase
										</div>
									</div>
									<div>
										<span className="flex gap-4 text-lg mr-4 font-bold text-accent2 ">
											<Database strokeWidth={2} className="text-orange" />{" "}
											Databases:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg bg-accent1/20 w-fit">
											MongoDB, PostgreSQL, MySQL, Firebase, Microsoft SQL Server
										</div>
									</div>
									<div>
										<span className="flex gap-4 text-lg mr-4 font-bold text-accent2 ">
											<Codesandbox strokeWidth={2} className="text-orange" />{" "}
											Development Tools:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg bg-accent1/20 w-fit">
											Git, GitHub, Docker, VS Code, IntelliJ IDEA, X code
										</div>
									</div>
									<div>
										<span className="flex gap-4 text-lg mr-4 font-bold text-accent2 ">
											<PenLine strokeWidth={2} className="text-orange" /> Other
											Skills:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg bg-accent1/20 w-fit">
											Video Editing (Adobe Premiere Pro, Final Cut Pro)
										</div>
									</div>
									<div>
										<span className="flex gap-4 text-lg mr-4 font-bold text-accent2 ">
											<UsersRound strokeWidth={2} className="text-orange" />{" "}
											Soft Skills:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg bg-accent1/20 w-fit">
											Problem Solving, Team Collaboration, Agile Methodologies,
											Communication, Adaptability, Quick Learning
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Key Projects */}
					<div className="bg-gray-900 w-4/5">
						<div className="flex flex-col space-y-1.5 border rounded-lg border-white/30">
							<div className="border-b border-white/20 w-full   p-5 sm:p-6 ">
								<h1 className="flex gap-3 font-semibold text-xl sm:text-2xl text-accent2 items-center">
									<Lightbulb className="text-accent1 scale-125" /> Key Projects
								</h1>
							</div>
							{/* Projects */}
							<div className="space-y-5 p-5 sm:p-6">
								<div className="">
									<h3 className="text-lg sm:text-xl font-semibold">Entrify</h3>
									<ul className="list-disc ml-6 text-sm opacity-70 font-extralight  mb-0.5">
										<li>
											Built a full-stack event booking platform — Entrify —
											using React.js, Node.js, Express.js, MongoDB, allowing
											users to browse movies, select seats, and securely book
											tickets.
										</li>
										<li>
											Integrated role-based authentication and payments with JWT
											and Stripe, supporting separate user, theater owner, and
											admin dashboards, along with secure transactions and
											booking verification via webhooks.
										</li>
										<li>
											Enhanced reliability and performance by adding rate
											limiting, sanitization, and CSP headers, and deployed the
											frontend and backend on Vercel and Render, respectively
										</li>
									</ul>
									<p className="text-sm opacity-70 font-extralight ">
										<span className="font-bold">Tools Used:</span> React.js,
										Node.js, Express.js, MongoDB, Stripe, JWT, Tailwind CSS,
										Vercel, Render
									</p>
								</div>
								<div className="">
									<h3 className="text-lg sm:text-xl font-semibold">
										Nitin Dev Space (Portfolio)
									</h3>
									<ul className="list-disc ml-6 text-sm opacity-70 font-extralight  mb-0.5">
										<li>
											Developed a dynamic and animated personal portfolio
											website using React.js (Vite), Tailwind CSS, and Node.js,
											showcasing projects, skills, and a blog with CMS
											capabilities powered by a custom Express + MongoDB
											backend.
										</li>
										<li>
											Implemented full CRUD functionality and admin dashboard,
											enabling live content updates for intro, about, projects,
											and contact sections, with authentication and secured API
											endpoints.
										</li>
										<li>
											◦ Integrated advanced animations and smooth user
											experience, leveraging Framer Motion and responsive design
											principles for cross-device compatibility and engaging
											interactions.
										</li>
										<li>
											Planned future integration of AI chatbot, enabling
											visitors to interact and query content using natural
											language, backed by LLMs like Gemini or GPT.
										</li>
									</ul>
									<p className="text-sm opacity-70 font-extralight ">
										<span className="font-bold">Tools Used:</span> React.js,
										Vite, Tailwind CSS, Framer Motion, Node.js, Express,
										MongoDB, Axios, Vercel, Render
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Education */}
					<div className="bg-gray-900 w-4/5">
						<div className="flex flex-col space-y-1.5 border rounded-lg border-white/30">
							<div className="border-b border-white/20 w-full   p-5 sm:p-6 ">
								<h1 className="flex gap-3 font-semibold text-xl sm:text-2xl text-accent2 items-center">
									<GraduationCap className="text-accent1 scale-125" /> Education
								</h1>
							</div>
							{/* Details */}
							<div className="space-y-5 p-5 sm:p-6">
								<div className="">
									<h3 className="text-lg sm:text-xl font-semibold">
										Software Development
									</h3>
									<p className="text-sm opacity-70 font-extralight  mb-0.5">
										Scaler Academy | Sept 2024 - Oct 2026 (Expected)
									</p>
									<p className="text-sm opacity-70 font-extralight ">
										Relevant Coursework: Computer Architecture, DSA, Full Stack
										Development, RDBMS, Java, Projects, LLD, HLD.
									</p>
								</div>
								<div className="">
									<h3 className="text-lg sm:text-xl font-semibold">
										B.Tech. in Mechanical Engineering
									</h3>
									<p className="text-sm opacity-70 font-extralight  mb-0.5">
										Maharshi Dayanand University, Rohtak, Haryana | Sept 2019 -
										May 2023
									</p>
									<p className="text-sm opacity-70 font-extralight ">
										Percentage: 70%
									</p>
								</div>
								<div className="">
									<h3 className="text-lg sm:text-xl font-semibold ">
										Higher Secondary Certificate (HSC/12th Grade)
									</h3>
									<p className="text-sm opacity-70 font-extralight  mb-0.5">
										R.E.D Sr. Sec. School, Jhajjar, Haryana | CBSE | 2018
									</p>
									<p className="text-sm opacity-70 font-extralight ">
										Percentage: 73%
									</p>
								</div>
								<div className="">
									<h3 className="text-lg sm:text-xl font-semibold text-foreground/90">
										Secondary School Certificate (SSC/10th Grade)
									</h3>
									<p className="text-sm opacity-70 font-extralight mb-0.5">
										R.E.D Sr. Sec. School, Jhajjar, Haryana | CBSE | 2016
									</p>
									<p className="text-sm opacity-70 font-extralight ">
										CGPA: 8.4
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default About;
