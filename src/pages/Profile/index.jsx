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

// --- Skill Arrays ---
const programmingLanguages = [
	"JavaScript",
	"TypeScript",
	"Java",
	"C++",
	"Python",
	"HTML5",
	"CSS3",
	"Bash",
	"SQL",
	"Shell Scripting",
	"JSON",
	"YAML",
	"Markdown",
];
const backendFrameworks = [
	"Express.js",
	"Spring Boot",
	"Spring Security",
	"Node.js",
	"Django",
	"FastAPI",
	"Hibernate",
	"RESTful APIs",
	"GraphQL",
	"WebSockets",
	"JWT",
	"Socket.IO",
	"Axios (Backend)",
	"API Documentation (Swagger/OpenAPI)",
];
const frontendTechnologies = [
	"React.js",
	"Next.js",
	"Redux",
	"Zustand",
	"Tailwind CSS",
	"Framer Motion",
	"Vite",
	"HTML5",
	"CSS3",
	"Axios (Frontend)",
	"React Router",
	"Responsive Design",
	"Styled Components",
	"SASS/SCSS",
];
const databases = [
	"MongoDB",
	"MySQL",
	"PostgreSQL",
	"Microsoft SQL Server",
	"NoSQL",
	"Redis",
	"Firebase Firestore",
	"ORM (Hibernate, Sequelize)",
	"Prisma",
];
const cloudDevops = [
	"Google Cloud",
	"AWS (EC2, S3, RDS, Lambda)",
	"Firebase",
	"Docker",
	"Jenkins",
	"GitHub Actions",
	"CI/CD Pipelines",
	"Render",
	"Vercel",
	"Nginx",
	"Netlify",
	"Heroku",
	"Linux Server Admin",
	"PM2",
];
const softwareEngineeringPractices = [
	"SDLC",
	"Agile",
	"Scrum",
	"System Design",
	"Microservices",
	"OOP",
	"API Design",
	"Design Patterns",
	"Version Control (Git)",
	"Code Optimization",
	"Scalability",
	"Low Level Design (LLD)",
	"High Level Design (HLD)",
	"Unit Testing",
	"Code Review",
	"Documentation",
];
const testingSecurity = [
	"Postman",
	"JUnit",
	"Integration Testing",
	"JWT Authentication",
	"Data Validation",
	"Role-Based Access Control",
	"Input Sanitization",
	"Webhooks",
	"Rate Limiting",
	"CSP Headers",
	"REST API Testing",
	"Mocha/Chai",
	"Jest",
	"Helmet.js",
	"OWASP Best Practices",
];

const skillTagClass =
	"inline-block text-white/80 border border-accent1 px-3 py-1 m-1 rounded-full text-xs font-semibold";

const About = () => {
	const [downloadStatus, setDownloadStatus] = useState("idle"); // idle | downloading | downloaded

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
								if (downloadStatus !== "idle") return;
								setDownloadStatus("downloading");
								downloadResume();
								setTimeout(() => {
									setDownloadStatus("downloaded");
									setTimeout(() => {
										setDownloadStatus("idle");
									}, 2500);
								}, 1600);
							}}
							disabled={downloadStatus === "downloading"}
							className="flex gap-4 cursor-pointer justify-center bg-accent2 py-2 px-4  rounded text-black"
						>
							<Download />{" "}
							{downloadStatus === "idle"
								? "Download Resume"
								: downloadStatus === "downloading"
								? "Downloading..."
								: "Downloaded ✓"}
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
											<Calendar size={16} className="text-accent1/50" /> Sept
											2025 - Dec 2025
										</div>
										<div>
											<h3 className="text-lg sm:text-xl font-semibold">
												Software Engineer Intern
											</h3>
											<div className="text-sm opacity-70 font-extralight my-2">
												<div className="flex gap-2">
													<div className="flex gap-2 items-center">
														<Briefcase size={16} /> Bambhari
													</div>
													|
													<div className="flex gap-2 items-center">
														<MapPin size={16} /> Bengaluru, Karnataka(Remote)
													</div>
												</div>
											</div>
												<ul className="list-disc text-sm opacity-70 ml-4 font-extralight">
													<li>
														Worked in an <span className="font-semibold text-accent2">Agile/Scrum</span> environment to design, build, and deploy production-grade applications, improving delivery speed by <span className="font-semibold text-accent2">30%</span>.
													</li>
													<li>
														Developed a scalable <span className="font-semibold text-accent2">Hackathon Platform</span> using <span className="font-semibold text-accent2">Spring Boot</span>, <span className="font-semibold text-accent2">React.js</span>, <span className="font-semibold text-accent2">MySQL</span>, and <span className="font-semibold text-accent2">JWT</span>, supporting <span className="font-semibold text-accent2">1K+ users</span> for event hosting, registration, and team collaboration.
													</li>
													<li>
														Customized the open-source <span className="font-semibold text-accent2">iDURAR ERP/CRM</span> (<span className="font-semibold text-accent2">MERN Stack</span>) for client use by adding validations, image uploads, and UI enhancements, improving performance and user experience by <span className="font-semibold text-accent2">25%</span>.
													</li>
													<li>
														<span className="font-semibold text-accent2">Tech Stack:</span> <span className="font-semibold text-accent2">Java</span>, <span className="font-semibold text-accent2">Spring Boot</span>, <span className="font-semibold text-accent2">React.js</span>, <span className="font-semibold text-accent2">MySQL</span>, <span className="font-semibold text-accent2">MongoDB</span>, <span className="font-semibold text-accent2">Node.js</span>, <span className="font-semibold text-accent2">Express.js</span>, <span className="font-semibold text-accent2">JWT</span>, <span className="font-semibold text-accent2">Docker</span>, <span className="font-semibold text-accent2">AWS</span>
													</li>
												</ul>
										</div>
									</div>
								</li>
								{/* Career Break & Upskilling */}
								<li className="flex items-start gap-3">
									<span className="mt-2 text-accent2 text-5xl leading-3">•</span>
									<div className="flex flex-col gap-2 mt-2">
										<div className="flex gap-1 items-center bg-accent1/30 w-fit p-1 rounded-lg text-xs text-white/50">
											<Calendar size={16} className="text-accent1/50" /> Jan 2025 - Aug 2025
										</div>
										<div>
											<h3 className="text-lg sm:text-xl font-semibold">Career Break & Upskilling</h3>
											<div className="text-sm opacity-70 font-extralight my-2">
												<div className="flex gap-2 items-center">
													<Briefcase size={16} /> Self-Paced Learning | <MapPin size={16} /> Remote
												</div>
											</div>
											<ul className="list-disc text-sm opacity-70 ml-4 font-extralight">
												<li>
													Focused on transitioning into Software Development from core engineering, leveraging <span className="font-semibold text-accent2">Scaler Academy</span>’s Software Development Program.
												</li>
												<li>
													Built hands-on projects including <span className="font-semibold text-accent2">ConnectSphere</span> (social media platform) and <span className="font-semibold text-accent2">Entrify</span> (event booking app) to strengthen full-stack development skills.
												</li>
												<li>
													Acquired expertise in <span className="font-semibold text-accent2">Java</span>, <span className="font-semibold text-accent2">Spring Boot</span>, <span className="font-semibold text-accent2">React.js</span>, and scalable <span className="font-semibold text-accent2">system design</span> through consistent practice and real-world application.
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
													Led a small <span className="font-semibold text-accent2">development team</span> in designing and prototyped innovative solutions in <span className="font-semibold text-accent2">R&D</span>.
												</li>
												<li>
													Oversaw end-to-end development of key projects, balancing rapid prototyping with strategic planning.
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
													Leveraged 3 years of part-time experience producing and <span className="font-semibold text-accent2">editing video content</span> for diverse clients.
												</li>
												<li>
													Focused on promotional materials, tutorials, and social media content.
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
											<Code strokeWidth={3} className="text-orange" /> Programming Languages:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg w-fit flex flex-wrap">
											{programmingLanguages.map((skill) => (
												<span key={skill} className={skillTagClass}>{skill}</span>
											))}
										</div>
									</div>
									<div>
										<span className="flex gap-4 text-lg mr-4 font-bold text-accent2 ">
											<Server strokeWidth={2} className="text-orange" /> Backend Frameworks:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg w-fit flex flex-wrap">
											{backendFrameworks.map((skill) => (
												<span key={skill} className={skillTagClass}>{skill}</span>
											))}
										</div>
									</div>
									<div>
										<span className="flex gap-4 text-lg mr-4 font-bold text-accent2 ">
											<Zap strokeWidth={2} className="text-orange" /> Frontend Technologies:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg w-fit flex flex-wrap">
											{frontendTechnologies.map((skill) => (
												<span key={skill} className={skillTagClass}>{skill}</span>
											))}
										</div>
									</div>
									<div>
										<span className="flex gap-4 text-lg mr-4 font-bold text-accent2 ">
											<Database strokeWidth={2} className="text-orange" /> Databases:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg w-fit flex flex-wrap">
											{databases.map((skill) => (
												<span key={skill} className={skillTagClass}>{skill}</span>
											))}
										</div>
									</div>
									<div>
										<span className="flex gap-4 text-lg mr-4 font-bold text-accent2 ">
											<Codesandbox strokeWidth={2} className="text-orange" /> Cloud & DevOps:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg w-fit flex flex-wrap">
											{cloudDevops.map((skill) => (
												<span key={skill} className={skillTagClass}>{skill}</span>
											))}
										</div>
									</div>
									<div>
										<span className="flex gap-4 text-lg mr-4 font-bold text-accent2 ">
											<PenLine strokeWidth={2} className="text-orange" /> Software Engineering Practices:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg w-fit flex flex-wrap">
											{softwareEngineeringPractices.map((skill) => (
												<span key={skill} className={skillTagClass}>{skill}</span>
											))}
										</div>
									</div>
									<div>
										<span className="flex gap-4 text-lg mr-4 font-bold text-accent2 ">
											<Lightbulb strokeWidth={2} className="text-orange" /> Testing & Security:
										</span>
										<div className="p-3 mt-2 ml-10 rounded-lg w-fit flex flex-wrap">
											{testingSecurity.map((skill) => (
												<span key={skill} className={skillTagClass}>{skill}</span>
											))}
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
							<div className="space-y-8 p-5 sm:p-8 bg-accent1/5 rounded-lg">
								{/* ConnectSphere Project */}
								<div className="rounded-xl border border-accent2/30 bg-primary2/70 shadow-lg p-6 mb-2">
									<h3 className="text-lg sm:text-xl font-semibold text-accent2 mb-2">ConnectSphere – Social Media Platform</h3>
									<ul className="list-disc ml-6 text-sm opacity-80 font-extralight mb-2 space-y-1">
										<li>
											Developed a <span className="font-semibold text-accent2">feature-rich social media platform</span> enabling users to connect, post updates, comment, like, and follow others, with real-time notifications and secure authentication.
										</li>
										<li>
											Architected a <span className="font-semibold text-accent2">robust backend</span> using <span className="font-semibold text-accent2">Java, Spring Boot, JWT</span>, and <span className="font-semibold text-accent2">MySQL</span>, with a modular REST API supporting scalable user and post management.
										</li>
										<li>
											Built a responsive and interactive frontend in <span className="font-semibold text-accent2">React.js</span> with <span className="font-semibold text-accent2">Redux</span>, <span className="font-semibold text-accent2">Tailwind CSS</span>, and <span className="font-semibold text-accent2">Axios</span>, delivering a seamless user experience across devices.
										</li>
										<li>
											Implemented <span className="font-semibold text-accent2">role-based access control</span>, <span className="font-semibold text-accent2">input validation</span>, and <span className="font-semibold text-accent2">secure password hashing</span> to ensure data privacy and platform security.
										</li>
										<li>
											Deployed on <span className="font-semibold text-accent2">Render</span> (backend) and <span className="font-semibold text-accent2">Vercel</span> (frontend), with CI/CD pipelines and Docker for streamlined deployment and scalability.
										</li>
										<li>
											<span className="font-semibold text-accent2">Results:</span> Achieved support for 1K+ users, real-time updates, and 99.9% uptime during testing phases.
										</li>
									</ul>
									<p className="text-sm opacity-80 font-extralight mt-2">
										<span className="font-semibold text-accent2">Key Technologies:</span> Java, Spring Boot, MySQL, React.js, Redux, Tailwind CSS, JWT, Docker, Render, Vercel
									</p>
								</div>
								{/* Entrify Project */}
								<div className="rounded-xl border border-accent2/30 bg-primary2/70 shadow-lg p-6 mb-2">
									<h3 className="text-lg sm:text-xl font-semibold text-accent2 mb-2">Entrify</h3>
									<ul className="list-disc ml-6 text-sm opacity-80 font-extralight mb-2 space-y-1">
										<li>
											Built a <span className="font-semibold text-accent2">full-stack event booking platform</span> — Entrify — using <span className="font-semibold text-accent2">React.js, Node.js, Express.js, MongoDB</span>, allowing users to browse movies, select seats, and securely book tickets.
										</li>
										<li>
											Integrated <span className="font-semibold text-accent2">role-based authentication</span> and payments with <span className="font-semibold text-accent2">JWT and Stripe</span>, supporting separate user, theater owner, and admin dashboards, along with secure transactions and booking verification via webhooks.
										</li>
										<li>
											Enhanced reliability and performance by adding <span className="font-semibold text-accent2">rate limiting, sanitization, and CSP headers</span>, and deployed the frontend and backend on <span className="font-semibold text-accent2">Vercel</span> and <span className="font-semibold text-accent2">Render</span>, respectively.
										</li>
									</ul>
									<p className="text-sm opacity-80 font-extralight mt-2">
										<span className="font-semibold text-accent2">Tools Used:</span> React.js, Node.js, Express.js, MongoDB, Stripe, JWT, Tailwind CSS, Vercel, Render
									</p>
								</div>
								{/* Nitin Dev Space Project */}
								<div className="rounded-xl border border-accent2/30 bg-primary2/70 shadow-lg p-6">
									<h3 className="text-lg sm:text-xl font-semibold text-accent2 mb-2">
										Nitin Dev Space (Portfolio)
									</h3>
									<ul className="list-disc ml-6 text-sm opacity-80 font-extralight mb-2 space-y-1">
										<li>
											Developed a dynamic and animated personal portfolio website using <span className="font-semibold text-accent2">React.js (Vite), Tailwind CSS, and Node.js</span>, showcasing projects, skills, and a blog with CMS capabilities powered by a custom <span className="font-semibold text-accent2">Express + MongoDB</span> backend.
										</li>
										<li>
											Implemented <span className="font-semibold text-accent2">full CRUD functionality and admin dashboard</span>, enabling live content updates for intro, about, projects, and contact sections, with authentication and secured API endpoints.
										</li>
										<li>
											Integrated advanced animations and smooth user experience, leveraging <span className="font-semibold text-accent2">Framer Motion</span> and responsive design principles for cross-device compatibility and engaging interactions.
										</li>
										<li>
											Planned future integration of <span className="font-semibold text-accent2">AI chatbot</span>, enabling visitors to interact and query content using natural language, backed by LLMs like Gemini or GPT.
										</li>
									</ul>
									<p className="text-sm opacity-80 font-extralight mt-2">
										<span className="font-semibold text-accent2">Tools Used:</span> React.js, Vite, Tailwind CSS, Framer Motion, Node.js, Express, MongoDB, Axios, Vercel, Render
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
										Relevant Coursework: Computer Architecture, Data Structures and Algorithms, Full Stack Development, RDBMS, Java, Projects, Low Level Design, High Level Design, System Design, MySQL, NoSQL.
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
