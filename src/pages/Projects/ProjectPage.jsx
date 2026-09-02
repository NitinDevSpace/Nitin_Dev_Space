import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CompassIcon, Github } from "lucide-react";
import { getProjectById } from "../../services/projects.service";
import Footer from "../../components/Footer";
import { ProjectPageSkeleton } from "../../components/Loading";
import StatusChip from "../../components/StatusChip";

const ProjectPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		async function fetchData() {
			setLoading(true);
			const res = await getProjectById(id);
			setProject(res?.data || null);
			setLoading(false);
		}
		fetchData();
	}, [id]);

	const images = project
		? [
				...(project.image ? [project.image] : []),
				...((Array.isArray(project.crousel) ? project.crousel : []) || []),
			].filter((url, i, arr) => url && arr.indexOf(url) === i)
		: [];

	useEffect(() => {
		if (images.length < 2) return;
		const interval = setInterval(() => {
			setCurrentImage((prev) => (prev + 1) % images.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [images.length]);

	const openNewWindow = (url) => {
		if (!url) return;
		const newWindow = window.open(url, "_blank", "noopener, noreferrer");
		if (newWindow) newWindow.focus();
	};

	if (loading) {
		return (
			<>
				<ProjectPageSkeleton />
				<Footer />
			</>
		);
	}

	if (!project) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-4">
				<h1 className="text-3xl">Project not found</h1>
				<button
					onClick={() => navigate("/projects")}
					className="bg-accent2 text-black px-4 py-2 rounded"
				>
					Back to Projects
				</button>
			</div>
		);
	}

	const stack = Array.isArray(project.techStack) ? project.techStack : [];

	return (
		<>
			<section className="bg-primary">
				<div className="relative w-full h-[52vh] min-h-[320px] overflow-hidden mt-16">
					{images[currentImage] && (
						<img
							src={images[currentImage]}
							alt={project.title}
							className="w-full h-full object-cover"
						/>
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-black/20" />
					<StatusChip status={project.status} />
					<div className="absolute bottom-8 left-0 right-0 px-6 md:px-16">
						<Link
							to="/projects"
							className="inline-flex items-center gap-2 text-sm text-accent1 mb-4 hover:text-accent2"
						>
							<ArrowLeft size={16} /> All projects
						</Link>
						<h1 className="text-3xl md:text-5xl font-semibold max-w-4xl">
							{project.title}
						</h1>
					</div>
					{images.length > 1 && (
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
							{images.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentImage(index)}
									className={`w-2.5 h-2.5 rounded-full ${
										index === currentImage ? "bg-white" : "bg-white/40"
									}`}
									aria-label={`Show image ${index + 1}`}
								/>
							))}
						</div>
					)}
				</div>

				<div className="bg-primary2 md:w-5/6 mx-auto shadow-2xl px-6 md:px-12 py-12 mb-16">
					<div className="flex flex-wrap gap-4 mb-8">
						{project.github && (
							<button
								onClick={() => openNewWindow(project.github)}
								className="flex items-center gap-2 bg-blue/60 px-4 py-2 rounded-full hover-scale"
							>
								<Github size={18} /> GitHub
							</button>
						)}
						{project.liveLink && (
							<button
								onClick={() => openNewWindow(project.liveLink)}
								className="flex items-center gap-2 bg-accent2 text-black px-4 py-2 rounded-full hover-scale"
							>
								<CompassIcon size={18} /> Live Site
							</button>
						)}
					</div>

					{project.overview && (
						<p className="text-lg opacity-80 font-light leading-relaxed mb-8">
							{project.overview}
						</p>
					)}

					<div className="mb-10">
						<h2 className="text-xl font-semibold text-accent2 mb-3">
							Details
						</h2>
						<div
							className="text-sm md:text-base leading-relaxed opacity-80 space-y-3 project-prose"
							dangerouslySetInnerHTML={{ __html: project.description }}
						/>
					</div>

					{stack.length > 0 && (
						<div>
							<h2 className="text-xl font-semibold text-accent2 mb-3">
								Tech Stack
							</h2>
							<div className="flex flex-wrap gap-2">
								{stack.map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-blue/20 border border-white/10 rounded text-sm"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</section>
			<Footer />
		</>
	);
};

export default ProjectPage;
