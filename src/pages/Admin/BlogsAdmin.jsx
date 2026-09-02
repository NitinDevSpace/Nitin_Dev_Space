import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import BlogsModal from "../../components/Modals/BlogsModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import { deleteBlog, getAllBlogs } from "../../services/blogs.service";
import { briefText, sortNewestFirst } from "../../utils/text";

function BlogsAdmin() {
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [detailModal, setDetailModal] = useState(false);
	const [modalType, setModalType] = useState("");
	const [selectedBlog, setSelectedBlog] = useState(null);
	const [blogs, setBlogs] = useState([]);

	const getData = async () => {
		const allBlogs = await getAllBlogs(true);
		setBlogs(sortNewestFirst(allBlogs?.data || []));
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="space-y-5">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<h2 className="text-2xl font-semibold">Blogs</h2>
					<p className="text-sm opacity-60 mt-1">
						Manage posts on /blogs. Click a card to preview, then edit or delete.
					</p>
				</div>
				<button
					type="button"
					onClick={() => {
						setSelectedBlog({ published: true, readTime: "5 min" });
						setModalType("new");
						setEditModal(true);
					}}
					className="inline-flex items-center gap-2 bg-accent2 text-black font-semibold rounded-lg px-4 py-2.5"
				>
					<Plus size={16} /> New post
				</button>
			</div>

			{blogs.length === 0 ? (
				<div className="rounded-xl border border-dashed border-white/15 bg-primary2/40 py-16 text-center text-sm opacity-50">
					No posts yet.
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
					{blogs.map((blog) => (
						<button
							key={blog._id}
							type="button"
							onClick={() => {
								setSelectedBlog(blog);
								setDetailModal(true);
							}}
							className="group text-left rounded-2xl border border-white/10 bg-primary2/70 overflow-hidden hover:border-accent2/40 transition-all"
						>
							<div className="relative aspect-[16/10] bg-primary overflow-hidden">
								{blog.coverImage ? (
									<img
										src={blog.coverImage}
										alt={blog.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
								) : (
									<div className="w-full h-full bg-white/5 flex items-center justify-center text-xs opacity-40">
										No cover
									</div>
								)}
								<span
									className={`absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full border backdrop-blur ${
										blog.published === false
											? "bg-white/10 border-white/20"
											: "bg-accent2/90 text-black border-accent2 font-semibold"
									}`}
								>
									{blog.published === false ? "Draft" : "Live"}
								</span>
							</div>
							<div className="p-4 space-y-2">
								<h3 className="font-semibold line-clamp-2">{blog.title}</h3>
								<p className="text-xs text-white/55 line-clamp-2">
									{briefText(blog.excerpt || blog.content, 110)}
								</p>
								<p className="text-[11px] text-white/35">
									/{blog.slug} · {blog.readTime || "5 min"}
								</p>
							</div>
						</button>
					))}
				</div>
			)}

			{detailModal && selectedBlog && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
					onClick={() => setDetailModal(false)}
				>
					<div
						className="w-full max-w-lg bg-primary2 border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[90dvh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						{selectedBlog.coverImage && (
							<img
								src={selectedBlog.coverImage}
								alt={selectedBlog.title}
								className="w-full aspect-[16/9] object-cover"
							/>
						)}
						<div className="p-5 space-y-3">
							<span
								className={`inline-block text-[11px] px-2.5 py-1 rounded-full ${
									selectedBlog.published === false
										? "bg-white/10"
										: "bg-accent2/20 text-accent2"
								}`}
							>
								{selectedBlog.published === false ? "Draft" : "Published"}
							</span>
							<h3 className="text-xl font-semibold">{selectedBlog.title}</h3>
							<p className="text-xs text-white/40">
								/{selectedBlog.slug} · {selectedBlog.readTime || "5 min"}
							</p>
							<p className="text-sm text-white/65 leading-relaxed">
								{selectedBlog.excerpt ||
									briefText(selectedBlog.content, 320) ||
									"No excerpt"}
							</p>
							{(selectedBlog.tags || []).length > 0 && (
								<div className="flex flex-wrap gap-1.5">
									{(selectedBlog.tags || []).map((tag) => (
										<span
											key={tag}
											className="px-2 py-0.5 rounded-full bg-accent1/15 text-[10px] text-accent1"
										>
											{tag}
										</span>
									))}
								</div>
							)}
							<div className="flex flex-wrap gap-2 pt-2">
								<button
									type="button"
									onClick={() => {
										setDetailModal(false);
										setModalType("edit");
										setEditModal(true);
									}}
									className="inline-flex items-center gap-2 bg-accent2 text-black font-semibold px-4 py-2 rounded-lg text-sm"
								>
									<Edit size={14} /> Edit
								</button>
								<button
									type="button"
									onClick={() => {
										setDetailModal(false);
										setDeleteModal(true);
									}}
									className="inline-flex items-center gap-2 border border-red-400/30 text-red-300 px-4 py-2 rounded-lg text-sm"
								>
									<Trash2 size={14} /> Delete
								</button>
								<button
									type="button"
									onClick={() => setDetailModal(false)}
									className="ml-auto text-sm opacity-60 hover:opacity-100 px-3"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{editModal && (
				<BlogsModal
					modalType={modalType}
					setModalType={setModalType}
					selectedBlog={selectedBlog}
					setSelectedBlog={setSelectedBlog}
					getData={getData}
					onClose={() => setEditModal(false)}
				/>
			)}
			{deleteModal && (
				<DeleteModal
					selectedProject={selectedBlog}
					setSelectedProject={setSelectedBlog}
					getData={getData}
					onClose={() => setDeleteModal(false)}
					onConfirm={async () => deleteBlog(selectedBlog._id)}
					label="Are you sure you want to delete this blog?"
				/>
			)}
		</div>
	);
}

export default BlogsAdmin;
