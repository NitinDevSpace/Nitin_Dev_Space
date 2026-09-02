import React, { useState } from "react";
import { addBlog, updateBlog } from "../../services/blogs.service";
import { slugify } from "../../utils/text";
import { Eye, Save, X } from "lucide-react";

const fieldClass = "admin-field";

function BlogsModal({
	modalType,
	setModalType,
	selectedBlog,
	setSelectedBlog,
	getData,
	onClose,
}) {
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	const setField = (key, value) =>
		setSelectedBlog((prev) => ({ ...prev, [key]: value }));

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		setError("");
		try {
			const payload = {
				title: selectedBlog?.title || "",
				slug: selectedBlog?.slug || slugify(selectedBlog?.title || ""),
				excerpt: selectedBlog?.excerpt || "",
				coverImage: selectedBlog?.coverImage || "",
				content: selectedBlog?.content || "",
				tags: Array.isArray(selectedBlog?.tags)
					? selectedBlog.tags.filter(Boolean)
					: String(selectedBlog?.tags || "")
							.split(",")
							.map((t) => t.trim())
							.filter(Boolean),
				readTime: selectedBlog?.readTime || "5 min",
				published: selectedBlog?.published !== false,
			};

			const res =
				modalType === "new"
					? await addBlog(payload)
					: await updateBlog(selectedBlog._id, payload);

			if (!res?.success && res?.success !== undefined) {
				throw new Error(res?.message || "Save failed");
			}
			if (!res) throw new Error("Save failed");

			await getData();
			setModalType("");
			setSelectedBlog(null);
			onClose();
		} catch (err) {
			setError(err?.message || "Could not save blog");
		} finally {
			setSaving(false);
		}
	};

	const handleCancel = () => {
		setSelectedBlog(null);
		onClose();
		setModalType("");
	};

	const preview = selectedBlog || {};
	const tags = Array.isArray(preview.tags)
		? preview.tags.filter(Boolean)
		: String(preview.tags || "")
				.split(",")
				.map((t) => t.trim())
				.filter(Boolean);

	return (
		<div
			className="fixed inset-0 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 py-10 px-4"
			onClick={handleCancel}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="w-full max-w-5xl bg-primary2 border border-white/10 text-white rounded-2xl shadow-2xl overflow-hidden"
			>
				<div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
					<div>
						<h1 className="text-xl font-semibold">
							{modalType === "new" ? "Add blog post" : "Update blog post"}
						</h1>
						<p className="text-xs opacity-50 mt-1">
							Card preview updates as you type · full post is on /blogs/:slug
						</p>
					</div>
					<button
						onClick={handleCancel}
						className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
					>
						<X size={18} />
					</button>
				</div>

				<div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0">
					<form
						onSubmit={handleSubmit}
						className="p-6 space-y-4 border-r border-white/10"
					>
						<label className="flex flex-col gap-1 text-sm">
							Title
							<input
								required
								className={fieldClass}
								value={preview.title || ""}
								onChange={(e) => {
									const title = e.target.value;
									setSelectedBlog((prev) => ({
										...prev,
										title,
										slug: prev?.slugLocked ? prev.slug : slugify(title),
									}));
								}}
							/>
						</label>
						<label className="flex flex-col gap-1 text-sm">
							Slug
							<input
								required
								className={fieldClass}
								value={preview.slug || ""}
								onChange={(e) =>
									setSelectedBlog((prev) => ({
										...prev,
										slug: e.target.value,
										slugLocked: true,
									}))
								}
							/>
						</label>
						<label className="flex flex-col gap-1 text-sm">
							Cover image URL
							<input
								className={fieldClass}
								value={preview.coverImage || ""}
								onChange={(e) => setField("coverImage", e.target.value)}
							/>
						</label>
						<label className="flex flex-col gap-1 text-sm">
							Excerpt
							<textarea
								rows="2"
								className={fieldClass}
								value={preview.excerpt || ""}
								onChange={(e) => setField("excerpt", e.target.value)}
							/>
						</label>
						<label className="flex flex-col gap-1 text-sm">
							Content (HTML)
							<textarea
								rows="8"
								required
								className={fieldClass}
								value={preview.content || ""}
								onChange={(e) => setField("content", e.target.value)}
							/>
						</label>
						<div className="grid sm:grid-cols-2 gap-4">
							<label className="flex flex-col gap-1 text-sm">
								Tags (comma separated)
								<input
									className={fieldClass}
									value={
										Array.isArray(preview.tags)
											? preview.tags.join(", ")
											: preview.tags || ""
									}
									onChange={(e) =>
										setField(
											"tags",
											e.target.value.split(",").map((t) => t.trim())
										)
									}
								/>
							</label>
							<label className="flex flex-col gap-1 text-sm">
								Read time
								<input
									className={fieldClass}
									value={preview.readTime || ""}
									onChange={(e) => setField("readTime", e.target.value)}
								/>
							</label>
						</div>
						<label className="flex items-center gap-3 p-3 rounded-lg bg-accent2/10 border border-accent2/30">
							<input
								type="checkbox"
								checked={preview.published !== false}
								onChange={(e) => setField("published", e.target.checked)}
							/>
							<span className="text-sm">Published — visible on /blogs</span>
						</label>

						{error && <p className="text-red-400 text-sm">{error}</p>}

						<button
							type="submit"
							disabled={saving}
							className="inline-flex items-center gap-2 bg-accent2 text-black font-semibold px-5 py-2.5 rounded-lg"
						>
							<Save size={16} />
							{saving
								? "Saving..."
								: modalType === "new"
									? "Add post"
									: "Update post"}
						</button>
					</form>

					<div className="p-6 bg-primary/40">
						<p className="text-xs uppercase tracking-[0.2em] text-accent2 mb-4 flex items-center gap-2">
							<Eye size={14} /> Card preview · /blogs
						</p>
						<div className="rounded-xl overflow-hidden border border-white/15 bg-primary2 max-w-sm mx-auto">
							{preview.coverImage ? (
								<img
									src={preview.coverImage}
									alt={preview.title || "Cover"}
									className="w-full h-40 object-cover"
								/>
							) : (
								<div className="w-full h-40 bg-white/5 flex items-center justify-center text-xs opacity-40">
									Cover image
								</div>
							)}
							<div className="p-4 space-y-3">
								<div className="flex flex-wrap gap-1.5">
									{tags.slice(0, 3).map((tag) => (
										<span
											key={tag}
											className="px-2 py-0.5 bg-accent1/20 rounded text-[10px]"
										>
											{tag}
										</span>
									))}
									{preview.published === false && (
										<span className="px-2 py-0.5 bg-white/10 rounded text-[10px]">
											Draft
										</span>
									)}
								</div>
								<h3 className="font-semibold line-clamp-2">
									{preview.title || "Post title"}
								</h3>
								<p className="text-xs opacity-70 line-clamp-3">
									{preview.excerpt || "Short excerpt appears here on the blog card."}
								</p>
								<div className="flex justify-between items-center pt-1 text-[11px] opacity-50">
									<span>{preview.readTime || "5 min"}</span>
									<span>/{preview.slug || "slug"}</span>
								</div>
							</div>
						</div>
						<p className="text-xs opacity-50 mt-4 text-center">
							Content HTML renders on the full blog post page after save.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BlogsModal;
