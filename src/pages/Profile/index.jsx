import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import ExperienceTimeline from "../../components/ExperienceTimeline";
import SkillsPanel from "../../components/SkillsPanel";
import {
	Briefcase,
	Download,
	GraduationCap,
	Lightbulb,
	Star,
} from "lucide-react";
import { getProfile } from "../../services/profile.service";
import { getKeyProjects } from "../../services/projects.service";
import { resumeFileUrl } from "../../services/resume.service";
import { getProjectOverview } from "../../utils/text";
import { Link } from "react-router-dom";
import { ProfileSkeleton } from "../../components/Loading";

function SectionCard({ icon: Icon, title, children }) {
	return (
		<section className="w-full rounded-xl border border-white/10 bg-primary2/60 overflow-hidden">
			<div className="border-b border-white/10 w-full px-5 sm:px-6 py-4 sm:py-5">
				<h2 className="flex gap-3 font-semibold text-lg sm:text-xl text-accent2 items-center">
					<Icon size={20} className="text-accent1 shrink-0" />
					{title}
				</h2>
			</div>
			{children}
		</section>
	);
}

const About = () => {
	const [downloadStatus, setDownloadStatus] = useState("idle");
	const [profile, setProfile] = useState(null);
	const [keyProjects, setKeyProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	const downloadResume = async () => {
		try {
			const res = await fetch(resumeFileUrl);
			if (!res.ok) {
				window.open("/Nitin_Resume.pdf", "_blank");
				return false;
			}
			const blob = await res.blob();
			const url = URL.createObjectURL(blob);
			window.open(url, "_blank");
			const link = document.createElement("a");
			link.href = url;
			link.download = "Nitin_Resume.pdf";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
			return true;
		} catch {
			window.open("/Nitin_Resume.pdf", "_blank");
			return false;
		}
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		async function fetchData() {
			setLoading(true);
			const [profileRes, keyRes] = await Promise.all([
				getProfile(),
				getKeyProjects(),
			]);
			setProfile(profileRes?.data || null);
			setKeyProjects(keyRes?.data || []);
			setLoading(false);
		}
		fetchData();
	}, []);

	return (
		<>
			<div className="relative bg-primary">
				<div className="relative pt-20 sm:pt-24 md:pt-28 mb-8 sm:mb-12 flex flex-col items-center justify-center px-4">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center px-2">
						My{" "}
						<span className="text-accent2 opacity-90">
							Professional Journey
						</span>
					</h1>
					<p className="opacity-70 mt-3 sm:mt-4 text-center max-w-2xl text-sm sm:text-base">
						A detailed overview of my experience, skills, and educational
						background.
					</p>
					<button
						onClick={async () => {
							if (downloadStatus !== "idle") return;
							setDownloadStatus("downloading");
							await downloadResume();
							setDownloadStatus("idle");
						}}
						disabled={downloadStatus === "downloading"}
						className="mt-5 flex gap-3 cursor-pointer justify-center bg-accent2 py-2.5 px-5 rounded-lg text-black font-medium disabled:opacity-60"
					>
						<Download size={18} />{" "}
						{downloadStatus === "downloading"
							? "Downloading..."
							: "Download Resume"}
					</button>
				</div>

				<div className="w-[94%] sm:w-11/12 max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8 mb-16">
					{loading ? (
						<ProfileSkeleton />
					) : (
						<>
							<SectionCard icon={Briefcase} title="Professional Experience">
								<ExperienceTimeline experiences={profile?.experiences || []} />
							</SectionCard>

							<SectionCard icon={Star} title="Technical Proficiency">
								<SkillsPanel categories={profile?.skillCategories || []} />
							</SectionCard>

							<SectionCard icon={Lightbulb} title="Key Projects">
								<div className="space-y-5 p-5 sm:p-8">
									{keyProjects.length === 0 ? (
										<p className="opacity-60 text-sm">
											Mark projects as Key in the admin dashboard to feature
											them here.
										</p>
									) : (
										keyProjects.map((project) => (
											<Link
												key={project._id}
												to={`/projects/${project._id}`}
												className="block rounded-xl border border-white/10 bg-primary/50 shadow-lg p-5 sm:p-6 hover:border-accent2/50 transition-colors"
											>
												<h3 className="text-lg sm:text-xl font-semibold text-accent2 mb-2">
													{project.title}
												</h3>
												<p className="text-sm opacity-80 font-extralight mb-3">
													{project.overview ||
														getProjectOverview(project, 220)}
												</p>
												{Array.isArray(project.techStack) &&
													project.techStack.length > 0 && (
														<p className="text-sm opacity-80 font-extralight">
															<span className="font-semibold text-accent2">
																Key Technologies:
															</span>{" "}
															{project.techStack.join(", ")}
														</p>
													)}
											</Link>
										))
									)}
								</div>
							</SectionCard>

							<SectionCard icon={GraduationCap} title="Education">
								<div className="space-y-5 p-5 sm:p-6">
									{(profile?.education || []).length === 0 ? (
										<p className="opacity-60 text-sm">
											Education will appear here once it is added in the admin
											dashboard.
										</p>
									) : (
										profile.education.map((item, index) => (
											<div key={`${item.title}-${index}`}>
												<h3 className="text-lg sm:text-xl font-semibold">
													{item.title}
												</h3>
												<p className="text-sm opacity-70 font-extralight mb-0.5">
													{item.school}
													{item.period ? ` | ${item.period}` : ""}
												</p>
												{item.details && (
													<p className="text-sm opacity-70 font-extralight">
														{item.details}
													</p>
												)}
											</div>
										))
									)}
								</div>
							</SectionCard>
						</>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default About;
