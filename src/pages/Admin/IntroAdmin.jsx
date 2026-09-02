import React, { useEffect, useState } from "react";
import { getIntro, updateIntro } from "../../services/intro.service";
import { Eye, Save } from "lucide-react";

function IntroAdmin() {
	const [intro, setIntro] = useState({ imageUrl: "", bio: "" });
	const [status, setStatus] = useState("");
	const [saving, setSaving] = useState(false);

	const getData = async () => {
		try {
			const res = await getIntro();
			setIntro(res?.data || { imageUrl: "", bio: "" });
		} catch (error) {
			console.error("HTTP error fetching intro:", error.message);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		setStatus("");
		try {
			const res = await updateIntro({
				imageUrl: intro.imageUrl,
				bio: intro.bio,
			});
			setStatus(res?.success ? "Intro saved — live on Home" : "Could not save");
		} catch {
			setStatus("Could not save intro");
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="space-y-4">
			<div>
				<h2 className="text-2xl font-semibold">Intro</h2>
				<p className="text-sm opacity-60 mt-1">
					Edits the homepage intro block (photo + bio under “Hi, I&apos;m Nitin
					Kumar”).
				</p>
			</div>

			<div className="grid lg:grid-cols-2 gap-6">
				<form
					onSubmit={handleSubmit}
					className="bg-primary2/70 border border-white/10 rounded-xl p-6 space-y-5"
				>
					<p className="text-xs uppercase tracking-[0.2em] text-accent2">
						Edit fields
					</p>
					<label className="flex flex-col gap-1.5 text-xs text-white/55">
						Image URL
						<input
							type="url"
							className="admin-field"
							placeholder="https://..."
							value={intro.imageUrl || ""}
							onChange={(e) =>
								setIntro((prev) => ({ ...prev, imageUrl: e.target.value }))
							}
						/>
					</label>
					<label className="flex flex-col gap-1.5 text-xs text-white/55">
						Bio (HTML allowed)
						<textarea
							rows="8"
							className="admin-field"
							placeholder="Your bio..."
							value={intro.bio || ""}
							onChange={(e) =>
								setIntro((prev) => ({ ...prev, bio: e.target.value }))
							}
						/>
					</label>
					<button
						type="submit"
						disabled={saving}
						className="inline-flex items-center gap-2 bg-accent2 text-black font-semibold px-5 py-2.5 rounded-lg"
					>
						<Save size={16} />
						{saving ? "Saving..." : "Save intro"}
					</button>
					{status && <p className="text-sm text-accent2">{status}</p>}
				</form>

				<div className="bg-primary border border-white/10 rounded-xl p-6">
					<p className="text-xs uppercase tracking-[0.2em] text-accent2 mb-4 flex items-center gap-2">
						<Eye size={14} /> Live preview · Homepage intro
					</p>
					<div className="relative rounded-xl border border-accent2/20 bg-primary2 p-5 overflow-hidden">
						<div className="flex flex-col md:flex-row gap-6 items-start">
							<div className="w-full md:w-2/5">
								{intro.imageUrl ? (
									<img
										src={intro.imageUrl}
										alt="Intro preview"
										className="w-full rounded-xl object-cover aspect-[3/4] border border-white/10"
									/>
								) : (
									<div className="w-full aspect-[3/4] rounded-xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-xs opacity-50">
										Image preview
									</div>
								)}
							</div>
							<div className="flex-1">
								<h3 className="text-2xl font-bold mb-2">
									Hi, I&apos;m <span className="text-accent2">Nitin Kumar</span>
								</h3>
								<p className="text-sm mb-4 opacity-80">
									Software Engineer <span className="text-accent2">//</span> Full
									Stack Developer <span className="text-accent2">//</span> AI
									Enthusiast
								</p>
								<div
									className="text-sm text-gray-200 leading-relaxed"
									dangerouslySetInnerHTML={{
										__html: intro.bio || "<em class='opacity-40'>Bio preview…</em>",
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default IntroAdmin;
