import React, { useEffect, useState } from "react";
import { getAboutme, updateAboutme } from "../../services/aboutMe.service";
import { Code, Eye, Layers, Save, Sparkles } from "lucide-react";

function AboutMeAdmin() {
	const [about, setAbout] = useState({
		para: "",
		frontend: "",
		backend: "",
		ai: "",
	});
	const [status, setStatus] = useState("");
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		async function load() {
			const res = await getAboutme();
			setAbout(res?.data || {});
		}
		load();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		setStatus("");
		try {
			await updateAboutme({
				para: about.para,
				frontend: about.frontend,
				backend: about.backend,
				ai: about.ai,
			});
			setStatus("About Me saved — live on Home");
		} catch {
			setStatus("Could not save");
		} finally {
			setSaving(false);
		}
	};

	const cards = [
		{ key: "frontend", title: "Frontend Development", icon: Code },
		{ key: "backend", title: "Backend Architecture", icon: Layers },
		{ key: "ai", title: "AI Integration", icon: Sparkles },
	];

	return (
		<div className="space-y-4">
			<div>
				<h2 className="text-2xl font-semibold">A Little About Me</h2>
				<p className="text-sm opacity-60 mt-1">
					Controls the homepage “A Little About Me” paragraph and three feature
					cards.
				</p>
			</div>

			<div className="grid xl:grid-cols-2 gap-6">
				<form
					onSubmit={handleSubmit}
					className="bg-primary2/70 border border-white/10 rounded-xl p-6 space-y-4"
				>
					<p className="text-xs uppercase tracking-[0.2em] text-accent2">
						Edit fields
					</p>
					<label className="flex flex-col gap-1.5 text-xs text-white/55">
						Main paragraph
						<textarea
							rows="3"
							className="admin-field"
							value={about.para || ""}
							onChange={(e) =>
								setAbout((p) => ({ ...p, para: e.target.value }))
							}
						/>
					</label>
					{cards.map((card) => (
						<label
							key={card.key}
							className="flex flex-col gap-1.5 text-xs text-white/55"
						>
							{card.title}
							<textarea
								rows="3"
								className="admin-field"
								value={about[card.key] || ""}
								onChange={(e) =>
									setAbout((p) => ({ ...p, [card.key]: e.target.value }))
								}
							/>
						</label>
					))}
					<button
						type="submit"
						disabled={saving}
						className="inline-flex items-center gap-2 bg-accent2 text-black font-semibold px-5 py-2.5 rounded-lg"
					>
						<Save size={16} />
						{saving ? "Saving..." : "Save about section"}
					</button>
					{status && <p className="text-sm text-accent2">{status}</p>}
				</form>

				<div className="bg-primary border border-white/10 rounded-xl p-6">
					<p className="text-xs uppercase tracking-[0.2em] text-accent2 mb-4 flex items-center gap-2">
						<Eye size={14} /> Live preview · Homepage section
					</p>
					<div className="text-center mb-6">
						<h3 className="text-2xl font-semibold mb-3">
							A Little <span className="text-accent2">About Me</span>
						</h3>
						<p className="text-sm opacity-70 font-light">
							{about.para || "Paragraph preview…"}
						</p>
					</div>
					<div className="grid sm:grid-cols-3 gap-3">
						{cards.map((card) => {
							const Icon = card.icon;
							return (
								<div
									key={card.key}
									className="border border-white/15 rounded-lg bg-primary2 p-4 text-center"
								>
									<div className="bg-black/30 text-accent2 mb-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
										<Icon size={18} />
									</div>
									<h4 className="text-sm font-semibold mb-2">{card.title}</h4>
									<p
										className="text-xs opacity-70 font-light"
										dangerouslySetInnerHTML={{
											__html: about[card.key] || "Card copy…",
										}}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutMeAdmin;
