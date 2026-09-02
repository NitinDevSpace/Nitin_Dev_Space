import React, { useEffect, useState } from "react";
import IntroAdmin from "./IntroAdmin";
import AlittleAboutMeAdmin from "./AboutMeAdmin";
import ProjectsAdmin from "./ProjectsAdmin";
import { verifyPassword } from "../../services/password.service";
import MessagesAdmin from "./MessagesAdmin";
import FeedbackAdmin from "./FeedbackAdmin";
import ProfileAdmin from "./ProfileAdmin";
import BlogsAdmin from "./BlogsAdmin";
import ResumeAdmin from "./ResumeAdmin";
import DashboardOverview from "./DashboardOverview";
import {
	BarChart3,
	FileText,
	FolderGit2,
	LayoutDashboard,
	Logs,
	Mail,
	Star,
	User,
	UserPen,
} from "lucide-react";

const navItems = [
	{ id: "overview", label: "Overview", icon: LayoutDashboard },
	{ id: "intro", label: "Intro", icon: User },
	{ id: "about", label: "About Me", icon: UserPen },
	{ id: "profile", label: "Profile", icon: BarChart3 },
	{ id: "projects", label: "Projects", icon: FolderGit2 },
	{ id: "blogs", label: "Blogs", icon: Logs },
	{ id: "resume", label: "Resume", icon: FileText },
	{ id: "messages", label: "Messages", icon: Mail },
	{ id: "feedback", label: "Feedback", icon: Star },
];

const Admin = () => {
	const [auth, setAuth] = useState(false);
	const [password, setPassword] = useState("");
	const [section, setSection] = useState("overview");

	const authenticate = async () => {
		if (password === "") {
			alert("Enter Password");
			return;
		}
		try {
			const res = await verifyPassword(password);
			if (res?.success) {
				setAuth(true);
			} else {
				alert("Incorrect password.");
			}
		} catch (error) {
			console.error("HTTP error verifying password:", error.message);
		}
	};

	const deAuthenticate = () => {
		setAuth(false);
		setPassword("");
		setSection("overview");
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	if (!auth) {
		return (
			<div className="flex flex-col justify-center items-center min-h-screen px-4">
				<div className="bg-primary2 border border-white/10 rounded-2xl p-10 w-full max-w-md shadow-2xl">
					<p className="text-accent2 text-sm tracking-[0.25em] uppercase mb-3">
						Nitin Dev Space
					</p>
					<h1 className="text-3xl font-semibold mb-2">Admin access</h1>
					<p className="text-sm opacity-60 mb-8">
						Enter the studio password to manage content, analytics, and the
						public brand.
					</p>
					<label htmlFor="password" className="text-sm opacity-80">
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") authenticate();
						}}
						placeholder="Enter password"
						className="admin-field mt-2 mb-6"
					/>
					<button
						onClick={authenticate}
						className="w-full p-3 rounded-lg bg-accent2 text-black font-semibold"
					>
						Enter dashboard
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-primary pt-24">
			<div className="flex">
				<aside className="hidden md:flex flex-col w-60 shrink-0 self-start sticky top-24 h-[calc(100vh-6rem)] border-r border-white/10 bg-primary2/80 p-4">
					<h1 className="text-lg font-semibold mb-6 px-2 shrink-0">Studio</h1>
					<nav className="flex flex-col gap-1 flex-1 min-h-0 overflow-y-auto allow-scroll pr-1">
						{navItems.map((item) => {
							const Icon = item.icon;
							const active = section === item.id;
							return (
								<button
									key={item.id}
									onClick={() => setSection(item.id)}
									className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left ${
										active
											? "bg-accent2 text-black font-semibold"
											: "text-white/70 hover:bg-white/5"
									}`}
								>
									<Icon size={16} />
									{item.label}
								</button>
							);
						})}
					</nav>
					<button
						onClick={deAuthenticate}
						className="shrink-0 mt-3 mx-2 p-2 rounded-lg bg-red-700/80 text-sm"
					>
						Sign out
					</button>
				</aside>

				<main className="flex-1 p-4 md:p-8 pb-20">
					<div className="md:hidden flex gap-2 overflow-x-auto mb-6 pb-2">
						{navItems.map((item) => (
							<button
								key={item.id}
								onClick={() => setSection(item.id)}
								className={`whitespace-nowrap px-3 py-2 rounded-full text-xs ${
									section === item.id
										? "bg-accent2 text-black"
										: "bg-primary2 border border-white/10"
								}`}
							>
								{item.label}
							</button>
						))}
					</div>

					{section === "overview" && (
						<DashboardOverview onNavigate={setSection} />
					)}
					{section === "intro" && <IntroAdmin />}
					{section === "about" && <AlittleAboutMeAdmin />}
					{section === "profile" && <ProfileAdmin />}
					{section === "projects" && <ProjectsAdmin />}
					{section === "blogs" && <BlogsAdmin />}
					{section === "resume" && <ResumeAdmin />}
					{section === "messages" && <MessagesAdmin />}
					{section === "feedback" && <FeedbackAdmin />}
				</main>
			</div>
		</div>
	);
};

export default Admin;
