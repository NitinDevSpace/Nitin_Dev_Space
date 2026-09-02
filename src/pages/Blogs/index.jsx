import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { BlogsGridSkeleton } from "../../components/Loading";
import { getAllBlogs } from "../../services/blogs.service";

const Blogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		async function fetchData() {
			setLoading(true);
			const res = await getAllBlogs();
			setBlogs(res?.data || []);
			setLoading(false);
		}
		fetchData();
	}, []);

	return (
		<>
			<section className="py-10 sm:py-12 px-4 max-w-7xl mx-auto pt-20 sm:pt-24 md:pt-28">
				<header className="mb-8 sm:mb-12 text-center">
					<h1 className="text-3xl sm:text-4xl font-bold">
						My <span className="text-accent2">Blog</span>
					</h1>
					<p className="opacity-70 mt-4">
						Notes on building, switching careers, and turning work into a brand.
					</p>
				</header>
				{loading ? (
					<BlogsGridSkeleton count={6} />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{blogs.map((card) => (
							<article
								key={card._id || card.slug}
								className="bg-primary2 rounded-lg shadow-lg overflow-hidden flex flex-col border border-white/10 hover:border-accent2/40 transition-colors"
							>
								<img
									src={card.coverImage}
									alt={card.title}
									className="w-full h-48 object-cover"
								/>
								<div className="p-6 flex flex-col flex-1">
									<div className="flex flex-wrap gap-2 mb-3">
										{(card.tags || []).slice(0, 3).map((tag) => (
											<span
												key={tag}
												className="text-[10px] uppercase tracking-wide text-accent2 border border-accent2/30 px-2 py-0.5 rounded-full"
											>
												{tag}
											</span>
										))}
									</div>
									<h2 className="text-xl font-semibold mb-2">{card.title}</h2>
									<p className="opacity-70 mb-4 flex-1 text-sm">{card.excerpt}</p>
									<div className="flex items-center justify-between">
										<span className="text-xs opacity-50">
											{card.readTime || "5 min"}
										</span>
										<Link
											to={`/blogs/${card.slug}`}
											className="bg-accent2 text-black px-4 py-2 rounded hover-scale text-sm"
										>
											Read More
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				)}
			</section>
			<Footer />
		</>
	);
};

export default Blogs;
