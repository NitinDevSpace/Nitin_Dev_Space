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
import {
	formatExperiencePeriod,
	newExperience,
	normalizeExperience,
	sortExperiences,
} from "../../utils/experienceDates";

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
					experiences: sortExperiences(res.data.experiences || []),
					skillCategories: res.data.skillCategories || [],
					education: res.data.education || [],
				});
			}
		}
		load();
	}, []);

	const updateExperience = (index, patch, { resort = false } = {}) => {
		setProfile((p) => {
			const experiences = [...p.experiences];
			const next = normalizeExperience({ ...experiences[index], ...patch });
			experiences[index] = next;
			return {
				...p,
				experiences: resort ? sortExperiences(experiences) : experiences,
			};
		});
	};

	const save = async () => {
		setSaving(true);
		setStatus("");
		const experiences = sortExperiences(profile.experiences).map((exp) => {
			const normalized = normalizeExperience(exp);
			return {
				...normalized,
				period: formatExperiencePeriod(normalized),
				bullets: (normalized.bullets || []).filter((b) => String(b).trim()),
			};
		});
		setProfile((p) => ({ ...p, experiences }));
		const payload = {
			...profile,
			experiences,
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
										experiences: sortExperiences([
											newExperience(),
											...p.experiences,
										]),
									}))
								}
								className="flex items-center gap-2 text-sm border border-white/15 px-3 py-1.5 rounded-lg hover:border-accent2/40"
							>
								<Plus size={14} /> Add role
							</button>
						</div>
						<p className="text-xs text-white/40">
							Roles sort automatically by date (current / newest first). New
							roles start at the top.
						</p>

						{profile.experiences.length === 0 && (
							<p className="text-sm opacity-45">No roles yet.</p>
						)}

						{profile.experiences.map((exp, index) => (
							<div
								key={`${exp.start || "x"}-${exp.title || "role"}-${index}`}
								className="rounded-xl border border-white/10 bg-primary/40 p-4 space-y-3"
							>
								<div className="flex items-center justify-between gap-2">
									<p className="text-[11px] text-accent2/80">
										{formatExperiencePeriod(exp) || "Set start month"}
									</p>
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
										Start (month & year)
										<input
											type="month"
											className={field}
											value={exp.start || ""}
											onChange={(e) =>
												updateExperience(
													index,
													{ start: e.target.value },
													{ resort: true }
												)
											}
										/>
									</label>
									<label className="flex flex-col gap-1.5 text-xs text-white/55">
										End (month & year)
										<input
											type="month"
											className={field}
											value={exp.end || ""}
											disabled={Boolean(exp.isCurrent)}
											onChange={(e) =>
												updateExperience(
													index,
													{ end: e.target.value, isCurrent: false },
													{ resort: true }
												)
											}
										/>
									</label>
									<label className="sm:col-span-2 flex items-center gap-3 text-sm text-white/70 rounded-lg border border-white/10 bg-primary/30 px-3 py-2.5">
										<input
											type="checkbox"
											checked={Boolean(exp.isCurrent)}
											onChange={(e) =>
												updateExperience(
													index,
													{
														isCurrent: e.target.checked,
														end: e.target.checked ? "" : exp.end,
													},
													{ resort: true }
												)
											}
										/>
										Currently working here
									</label>
									<label className="flex flex-col gap-1.5 text-xs text-white/55">
										Title
										<input
											className={field}
											placeholder="Software Engineer Intern"
											value={exp.title || ""}
											onChange={(e) =>
												updateExperience(index, { title: e.target.value })
											}
										/>
									</label>
									<label className="flex flex-col gap-1.5 text-xs text-white/55">
										Company
										<input
											className={field}
											placeholder="Company"
											value={exp.company || ""}
											onChange={(e) =>
												updateExperience(index, { company: e.target.value })
											}
										/>
									</label>
									<label className="flex flex-col gap-1.5 text-xs text-white/55 sm:col-span-2">
										Location
										<input
											className={field}
											placeholder="Remote / City"
											value={exp.location || ""}
											onChange={(e) =>
												updateExperience(index, { location: e.target.value })
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
											updateExperience(index, {
												bullets: e.target.value.split("\n"),
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
											{ ...emptySkill },
											...p.skillCategories,
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
										education: [{ ...emptyEducation }, ...p.education],
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
											{formatExperiencePeriod(previewExp) || "Period"}
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
