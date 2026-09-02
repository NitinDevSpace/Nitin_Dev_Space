import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../../components/Footer";
import { BlogPostSkeleton } from "../../components/Loading";
import AdSlot from "../../components/AdSlot";
import { ensureAdsScript } from "../../utils/ads";
import { getBlogBySlug } from "../../services/blogs.service";

const BlogPost = () => {
	const { slug } = useParams();
	const navigate = useNavigate();
	const [blog, setBlog] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		ensureAdsScript();
	}, []);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		async function fetchData() {
			setLoading(true);
			const res = await getBlogBySlug(slug);
			setBlog(res?.data || null);
			setLoading(false);
		}
		fetchData();
	}, [slug]);

	if (loading) {
		return (
			<>
				<BlogPostSkeleton />
				<Footer />
			</>
		);
	}

	if (!blog) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-4">
				<h1 className="text-3xl">Post not found</h1>
				<button
					onClick={() => navigate("/blogs")}
					className="bg-accent2 text-black px-4 py-2 rounded"
				>
					Back to Blogs
				</button>
			</div>
		);
	}

	return (
		<>
			<article className="bg-primary">
				<div className="relative w-full h-[46vh] min-h-[280px] overflow-hidden mt-16">
					<img
						src={blog.coverImage}
						alt={blog.title}
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-black/20" />
					<div className="absolute bottom-8 left-0 right-0 px-6 md:px-16">
						<Link
							to="/blogs"
							className="inline-flex items-center gap-2 text-sm text-accent1 mb-4 hover:text-accent2"
						>
							<ArrowLeft size={16} /> All posts
						</Link>
						<div className="flex flex-wrap gap-2 mb-3">
							{(blog.tags || []).map((tag) => (
								<span
									key={tag}
									className="text-[10px] uppercase tracking-wide text-accent2 border border-accent2/40 px-2 py-0.5 rounded-full bg-black/30"
								>
									{tag}
								</span>
							))}
						</div>
						<h1 className="text-3xl md:text-5xl font-semibold max-w-4xl">
							{blog.title}
						</h1>
						<p className="opacity-70 mt-3 text-sm">
							{blog.readTime || "5 min read"}
							{blog.createdAt
								? ` · ${new Date(blog.createdAt).toLocaleDateString()}`
								: ""}
						</p>
					</div>
				</div>

				<div className="md:w-5/6 mx-auto px-4 md:px-0 py-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-8">
					<div>
						<AdSlot slot="1234567890" className="mb-8" />
						{blog.excerpt && (
							<p className="text-lg font-light opacity-80 mb-8 leading-relaxed">
								{blog.excerpt}
							</p>
						)}
						<div
							className="blog-prose text-base leading-relaxed opacity-90 space-y-4"
							dangerouslySetInnerHTML={{ __html: blog.content }}
						/>
						<AdSlot slot="1234567891" className="mt-10" format="autorelaxed" />
					</div>
					<div className="space-y-6 lg:sticky lg:top-28 h-fit">
						<AdSlot slot="1234567892" className="min-h-[250px]" />
						<AdSlot slot="1234567893" className="min-h-[250px]" />
					</div>
				</div>
			</article>
			<Footer />
		</>
	);
};

export default BlogPost;
