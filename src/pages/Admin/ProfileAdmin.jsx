import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/profile.service";
import {
	ArrowDown,
	ArrowUp,
	Eye,
	Plus,
	Save,
	Trash2,
} from "lucide-react";

const emptyExperience = {
	period: "",
	title: "",
	company: "",
	location: "",
	bullets: [""],
};

const emptyEducation = {
	title: "",
	school: "",
	period: "",
	details: "",
};

const emptySkill = {
	name: "",
	icon: "Code",
	skills: [],
};

const field =
	"admin-field";

function moveItem(list, index, direction) {
	const next = [...list];
	const target = index + direction;
	if (target < 0 || target >= next.length) return next;
	[next[index], next[target]] = [next[target], next[index]];
	return next;
}

function IconBtn({ onClick, children, danger }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`p-1.5 rounded-lg border border-white/10 hover:border-white/25 transition-colors ${
				danger ? "text-red-300 hover:border-red-400/40" : "text-white/60"
			}`}
		>
			{children}
		</button>
	);
}

function ProfileAdmin() {
	const [profile, setProfile] = useState({
		experiences: [],
		skillCategories: [],
		education: [],
	});
	const [saving, setSaving] = useState(false);
	const [status, setStatus] = useState("");

	useEffect(() => {
		async function load() {
			const res = await getProfile();
			if (res?.data) {
				setProfile({
					experiences: res.data.experiences || [],
					skillCategories: res.data.skillCategories || [],
					education: res.data.education || [],
				});
			}
		}
		load();
	}, []);

	const save = async () => {
		setSaving(true);
		setStatus("");
		const payload = {
			...profile,
			experiences: profile.experiences.map((exp) => ({
				...exp,
				bullets: (exp.bullets || []).filter((b) => String(b).trim()),
			})),
			skillCategories: profile.skillCategories.map((cat) => ({
				...cat,
				skills: Array.isArray(cat.skills)
					? cat.skills
					: String(cat.skills)
							.split(",")
							.map((s) => s.trim())
							.filter(Boolean),
			})),
		};
		const res = await updateProfile(payload);
		setSaving(false);
		setStatus(
			res?.success ? "Profile saved — live on /profile" : "Could not save profile"
		);
	};

	const previewExp = profile.experiences[0];
	const previewSkills = profile.skillCategories.slice(0, 2);
	const previewEdu = profile.education[0];

	return (
		<div className="space-y-5">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<h2 className="text-2xl font-semibold">Profile content</h2>
					<p className="text-sm opacity-60 mt-1">
						Drives the public Profile page. Preview on the right updates as you
						type.
					</p>
				</div>
				<button
					type="button"
					onClick={save}
					disabled={saving}
					className="inline-flex items-center gap-2 bg-accent2 text-black px-5 py-2.5 rounded-lg font-semibold"
				>
					<Save size={16} />
					{saving ? "Saving..." : "Save profile"}
				</button>
			</div>
			{status && <p className="text-sm text-accent2">{status}</p>}

			<div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
				<div className="space-y-5">
					<section className="bg-primary2/70 border border-white/10 rounded-xl p-5 sm:p-6 space-y-4">
						<div className="flex items-center justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-[0.2em] text-accent2">
									Experience
								</p>
								<h3 className="text-lg mt-1">Professional roles</h3>
							</div>
							<button
								type="button"
								onClick={() =>
									setProfile((p) => ({
										...p,
										experiences: [...p.experiences, { ...emptyExperience }],
									}))
								}
								className="flex items-center gap-2 text-sm border border-white/15 px-3 py-1.5 rounded-lg hover:border-accent2/40"
							>
								<Plus size={14} /> Add role
							</button>
						</div>

						{profile.experiences.length === 0 && (
							<p className="text-sm opacity-45">No roles yet.</p>
						)}

						{profile.experiences.map((exp, index) => (
							<div
								key={index}
								className="rounded-xl border border-white/10 bg-primary/40 p-4 space-y-3"
							>
								<div className="flex justify-end gap-1.5">
									<IconBtn
										onClick={() =>
											setProfile((p) => ({
												...p,
												experiences: moveItem(p.experiences, index, -1),
											}))
										}
									>
										<ArrowUp size={15} />
									</IconBtn>
									<IconBtn
										onClick={() =>
											setProfile((p) => ({
												...p,
												experiences: moveItem(p.experiences, index, 1),
											}))
										}
									>
										<ArrowDown size={15} />
									</IconBtn>
									<IconBtn
										danger
										onClick={() =>
											setProfile((p) => ({
												...p,
												experiences: p.experiences.filter((_, i) => i !== index),
											}))
										}
									>
										<Trash2 size={15} />
									</IconBtn>
								</div>
								<div className="grid sm:grid-cols-2 gap-3">
									<label className="flex flex-col gap-1.5 text-xs text-white/55">
										Period
										<input
											className={field}
											placeholder="Sept 2025 - Dec 2025"
											value={exp.period}
											onChange={(e) =>
												setProfile((p) => {
													const experiences = [...p.experiences];
													experiences[index] = {
														...exp,
														period: e.target.value,
													};
													return { ...p, experiences };
												})
											}
										/>
									</label>
									<label className="flex flex-col gap-1.5 text-xs text-white/55">
										Title
										<input
											className={field}
											placeholder="Software Engineer Intern"
											value={exp.title}
											onChange={(e) =>
												setProfile((p) => {
													const experiences = [...p.experiences];
													experiences[index] = {
														...exp,
														title: e.target.value,
													};
													return { ...p, experiences };
												})
											}
										/>
									</label>
									<label className="flex flex-col gap-1.5 text-xs text-white/55">
										Company
										<input
											className={field}
											placeholder="Company"
											value={exp.company}
											onChange={(e) =>
												setProfile((p) => {
													const experiences = [...p.experiences];
													experiences[index] = {
														...exp,
														company: e.target.value,
													};
													return { ...p, experiences };
												})
											}
										/>
									</label>
									<label className="flex flex-col gap-1.5 text-xs text-white/55">
										Location
										<input
											className={field}
											placeholder="Remote / City"
											value={exp.location}
											onChange={(e) =>
												setProfile((p) => {
													const experiences = [...p.experiences];
													experiences[index] = {
														...exp,
														location: e.target.value,
													};
													return { ...p, experiences };
												})
											}
										/>
									</label>
								</div>
								<label className="flex flex-col gap-1.5 text-xs text-white/55">
									Bullets (one per line, HTML ok)
									<textarea
										className={field}
										rows="4"
										placeholder="Built X using Y..."
										value={(exp.bullets || []).join("\n")}
										onChange={(e) =>
											setProfile((p) => {
												const experiences = [...p.experiences];
												experiences[index] = {
													...exp,
													bullets: e.target.value.split("\n"),
												};
												return { ...p, experiences };
											})
										}
									/>
								</label>
							</div>
						))}
					</section>

					<section className="bg-primary2/70 border border-white/10 rounded-xl p-5 sm:p-6 space-y-4">
						<div className="flex items-center justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-[0.2em] text-accent2">
									Skills
								</p>
								<h3 className="text-lg mt-1">Technical proficiency</h3>
							</div>
							<button
								type="button"
								onClick={() =>
									setProfile((p) => ({
										...p,
										skillCategories: [
											...p.skillCategories,
											{ ...emptySkill },
										],
									}))
								}
								className="flex items-center gap-2 text-sm border border-white/15 px-3 py-1.5 rounded-lg hover:border-accent2/40"
							>
								<Plus size={14} /> Add category
							</button>
						</div>

						{profile.skillCategories.map((cat, index) => (
							<div
								key={index}
								className="rounded-xl border border-white/10 bg-primary/40 p-4 grid sm:grid-cols-[1fr_140px_auto] gap-3"
							>
								<label className="flex flex-col gap-1.5 text-xs text-white/55">
									Category
									<input
										className={field}
										placeholder="Frontend"
										value={cat.name}
										onChange={(e) =>
											setProfile((p) => {
												const skillCategories = [...p.skillCategories];
												skillCategories[index] = {
													...cat,
													name: e.target.value,
												};
												return { ...p, skillCategories };
											})
										}
									/>
								</label>
								<label className="flex flex-col gap-1.5 text-xs text-white/55">
									Icon name
									<input
										className={field}
										placeholder="Code"
										value={cat.icon}
										onChange={(e) =>
											setProfile((p) => {
												const skillCategories = [...p.skillCategories];
												skillCategories[index] = {
													...cat,
													icon: e.target.value,
												};
												return { ...p, skillCategories };
											})
										}
									/>
								</label>
								<div className="flex sm:items-end sm:justify-end">
									<IconBtn
										danger
										onClick={() =>
											setProfile((p) => ({
												...p,
												skillCategories: p.skillCategories.filter(
													(_, i) => i !== index
												),
											}))
										}
									>
										<Trash2 size={15} />
									</IconBtn>
								</div>
								<label className="flex flex-col gap-1.5 text-xs text-white/55 sm:col-span-3">
									Skills (comma separated)
									<textarea
										className={field}
										rows="2"
										placeholder="React, Tailwind, Framer Motion"
										value={
											Array.isArray(cat.skills)
												? cat.skills.join(", ")
												: cat.skills
										}
										onChange={(e) =>
											setProfile((p) => {
												const skillCategories = [...p.skillCategories];
												skillCategories[index] = {
													...cat,
													skills: e.target.value
														.split(",")
														.map((s) => s.trim())
														.filter(Boolean),
												};
												return { ...p, skillCategories };
											})
										}
									/>
								</label>
							</div>
						))}
					</section>

					<section className="bg-primary2/70 border border-white/10 rounded-xl p-5 sm:p-6 space-y-4">
						<div className="flex items-center justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-[0.2em] text-accent2">
									Education
								</p>
								<h3 className="text-lg mt-1">Degrees & learning</h3>
							</div>
							<button
								type="button"
								onClick={() =>
									setProfile((p) => ({
										...p,
										education: [...p.education, { ...emptyEducation }],
									}))
								}
								className="flex items-center gap-2 text-sm border border-white/15 px-3 py-1.5 rounded-lg hover:border-accent2/40"
							>
								<Plus size={14} /> Add education
							</button>
						</div>

						{profile.education.map((item, index) => (
							<div
								key={index}
								className="rounded-xl border border-white/10 bg-primary/40 p-4 space-y-3"
							>
								<div className="flex justify-end">
									<IconBtn
										danger
										onClick={() =>
											setProfile((p) => ({
												...p,
												education: p.education.filter((_, i) => i !== index),
											}))
										}
									>
										<Trash2 size={15} />
									</IconBtn>
								</div>
								<label className="flex flex-col gap-1.5 text-xs text-white/55">
									Title / degree
									<input
										className={field}
										placeholder="B.Tech Computer Science"
										value={item.title}
										onChange={(e) =>
											setProfile((p) => {
												const education = [...p.education];
												education[index] = { ...item, title: e.target.value };
												return { ...p, education };
											})
										}
									/>
								</label>
								<label className="flex flex-col gap-1.5 text-xs text-white/55">
									School
									<input
										className={field}
										placeholder="University"
										value={item.school}
										onChange={(e) =>
											setProfile((p) => {
												const education = [...p.education];
												education[index] = { ...item, school: e.target.value };
												return { ...p, education };
											})
										}
									/>
								</label>
								<label className="flex flex-col gap-1.5 text-xs text-white/55">
									Period
									<input
										className={field}
										placeholder="2021 - 2025"
										value={item.period}
										onChange={(e) =>
											setProfile((p) => {
												const education = [...p.education];
												education[index] = { ...item, period: e.target.value };
												return { ...p, education };
											})
										}
									/>
								</label>
								<label className="flex flex-col gap-1.5 text-xs text-white/55">
									Details
									<textarea
										className={field}
										rows="2"
										placeholder="Relevant coursework, honors..."
										value={item.details}
										onChange={(e) =>
											setProfile((p) => {
												const education = [...p.education];
												education[index] = {
													...item,
													details: e.target.value,
												};
												return { ...p, education };
											})
										}
									/>
								</label>
							</div>
						))}
					</section>
				</div>

				<aside className="xl:sticky xl:top-28 space-y-4">
					<div className="bg-primary border border-white/10 rounded-xl p-5">
						<p className="text-xs uppercase tracking-[0.2em] text-accent2 mb-4 flex items-center gap-2">
							<Eye size={14} /> Live preview · /profile
						</p>
						<div className="rounded-xl border border-accent2/20 bg-primary2/80 p-4 space-y-4">
							<div>
								<p className="text-[11px] text-white/40 mb-2">Experience card</p>
								{previewExp ? (
									<div className="rounded-lg border border-white/10 bg-primary/50 p-3 space-y-1">
										<p className="text-[10px] text-white/40">
											{previewExp.period || "Period"}
										</p>
										<p className="font-semibold text-sm">
											{previewExp.title || "Role title"}
										</p>
										<p className="text-xs text-white/55">
											{previewExp.company || "Company"}
											{previewExp.location ? ` · ${previewExp.location}` : ""}
										</p>
										<ul className="text-[11px] text-white/50 list-disc pl-4 space-y-0.5 pt-1">
											{(previewExp.bullets || [])
												.filter((b) => String(b).trim())
												.slice(0, 2)
												.map((b, i) => (
													<li key={i} className="line-clamp-2">
														{b.replace(/<[^>]*>/g, "")}
													</li>
												))}
										</ul>
									</div>
								) : (
									<p className="text-xs opacity-40">Add a role to preview it.</p>
								)}
							</div>

							<div>
								<p className="text-[11px] text-white/40 mb-2">Skills</p>
								{previewSkills.length ? (
									<div className="space-y-2">
										{previewSkills.map((cat, i) => (
											<div
												key={i}
												className="rounded-lg border border-white/10 bg-primary/50 p-3"
											>
												<p className="text-xs font-medium text-accent2 mb-1.5">
													{cat.name || "Category"}
												</p>
												<div className="flex flex-wrap gap-1">
													{(cat.skills || []).slice(0, 6).map((s) => (
														<span
															key={s}
															className="px-2 py-0.5 rounded-full bg-accent1/15 text-[10px] text-accent1"
														>
															{s}
														</span>
													))}
												</div>
											</div>
										))}
									</div>
								) : (
									<p className="text-xs opacity-40">
										Add skill categories to preview.
									</p>
								)}
							</div>

							<div>
								<p className="text-[11px] text-white/40 mb-2">Education</p>
								{previewEdu ? (
									<div className="rounded-lg border border-white/10 bg-primary/50 p-3">
										<p className="font-semibold text-sm">
											{previewEdu.title || "Degree"}
										</p>
										<p className="text-xs text-white/55 mt-0.5">
											{previewEdu.school || "School"}
											{previewEdu.period ? ` · ${previewEdu.period}` : ""}
										</p>
									</div>
								) : (
									<p className="text-xs opacity-40">
										Add education to preview.
									</p>
								)}
							</div>
						</div>
						<p className="text-[11px] opacity-40 mt-3 text-center">
							Key projects are managed from the Projects tab (toggle “Key
							project”).
						</p>
					</div>
				</aside>
			</div>
		</div>
	);
}

export default ProfileAdmin;
