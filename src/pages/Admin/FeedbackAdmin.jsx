import React, { useEffect, useMemo, useState } from "react";
import { MessageSquareHeart, RefreshCw, Star, X } from "lucide-react";
import { getAllFeedback } from "../../services/feedback.service";
import { Skeleton } from "../../components/Loading";
import { sortNewestFirst } from "../../utils/text";

const FILTERS = [
	{ id: "all", label: "All" },
	{ id: "5", label: "5★" },
	{ id: "4", label: "4★" },
	{ id: "3", label: "3★" },
	{ id: "2", label: "2★" },
	{ id: "1", label: "1★" },
	{ id: "written", label: "With text" },
	{ id: "rating-only", label: "Rating only" },
];

function Stars({ value, size = 14 }) {
	return (
		<span className="inline-flex items-center gap-0.5 text-accent2">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					size={size}
					className={i < value ? "fill-accent2" : "text-white/20"}
				/>
			))}
		</span>
	);
}

function FeedbackAdmin() {
	const [feedbacks, setFeedbacks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState("all");
	const [selected, setSelected] = useState(null);

	const getData = async () => {
		setLoading(true);
		try {
			const allFeedbacks = await getAllFeedback();
			setFeedbacks(sortNewestFirst(allFeedbacks?.data || []));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const avg = useMemo(() => {
		if (!feedbacks.length) return "—";
		const sum = feedbacks.reduce((acc, f) => acc + (Number(f.rating) || 0), 0);
		return (sum / feedbacks.length).toFixed(1);
	}, [feedbacks]);

	const buckets = useMemo(() => {
		const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
		feedbacks.forEach((f) => {
			const r = Number(f.rating);
			if (counts[r] !== undefined) counts[r] += 1;
		});
		return counts;
	}, [feedbacks]);

	const filtered = useMemo(() => {
		return feedbacks.filter((f) => {
			const rating = Number(f.rating) || 0;
			const hasText = Boolean(String(f.feedback || "").trim());
			if (filter === "written") return hasText;
			if (filter === "rating-only") return !hasText;
			if (["1", "2", "3", "4", "5"].includes(filter)) {
				return rating === Number(filter);
			}
			return true;
		});
	}, [feedbacks, filter]);

	return (
		<div className="space-y-5">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<h2 className="text-2xl font-semibold">Feedbacks</h2>
					<p className="text-sm opacity-60 mt-1">
						Filter by rating or text, then open a card for the full note.
					</p>
				</div>
				<button
					type="button"
					onClick={getData}
					className="inline-flex items-center gap-2 text-sm border border-white/15 px-3 py-2 rounded-lg hover:border-accent2/40"
				>
					<RefreshCw size={14} /> Refresh
				</button>
			</div>

			<div className="grid sm:grid-cols-3 gap-3">
				<div className="bg-primary2/70 border border-white/10 rounded-xl p-4">
					<p className="text-xs text-white/45 mb-1">Total</p>
					<p className="text-2xl font-semibold">{feedbacks.length}</p>
				</div>
				<div className="bg-primary2/70 border border-white/10 rounded-xl p-4">
					<p className="text-xs text-white/45 mb-1">Average</p>
					<p className="text-2xl font-semibold flex items-center gap-2">
						{avg} <Star size={16} className="text-accent2 fill-accent2" />
					</p>
				</div>
				<div className="bg-primary2/70 border border-white/10 rounded-xl p-4">
					<p className="text-xs text-white/45 mb-2">By rating</p>
					<div className="flex flex-wrap gap-1.5">
						{[5, 4, 3, 2, 1].map((star) => (
							<button
								key={star}
								type="button"
								onClick={() => setFilter(String(star))}
								className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
									filter === String(star)
										? "bg-accent2 text-black border-accent2"
										: "bg-primary border-white/10 hover:border-accent2/40"
								}`}
							>
								{star}★ {buckets[star]}
							</button>
						))}
					</div>
				</div>
			</div>

			<div className="flex flex-wrap gap-2">
				{FILTERS.map((f) => (
					<button
						key={f.id}
						type="button"
						onClick={() => setFilter(f.id)}
						className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
							filter === f.id
								? "bg-accent2 text-black border-accent2 font-semibold"
								: "border-white/15 text-white/70 hover:border-accent2/40"
						}`}
					>
						{f.label}
					</button>
				))}
			</div>

			<div className="flex items-center gap-2 text-accent2 text-sm">
				<MessageSquareHeart size={16} />
				{loading
					? "Loading..."
					: `${filtered.length} response${filtered.length === 1 ? "" : "s"}`}
			</div>

			{loading ? (
				<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
					{[0, 1, 2, 3, 4, 5].map((i) => (
						<div
							key={i}
							className="rounded-2xl border border-white/10 bg-primary2/50 p-4 space-y-3"
						>
							<Skeleton className="h-5 w-28" />
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-3 w-24" />
						</div>
					))}
				</div>
			) : filtered.length === 0 ? (
				<div className="rounded-xl border border-dashed border-white/15 bg-primary2/40 py-16 text-center text-sm opacity-50">
					{feedbacks.length === 0
						? "No feedback yet."
						: "Nothing matches this filter."}
				</div>
			) : (
				<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
					{filtered.map((item, i) => {
						const rating = Number(item.rating) || 0;
						const text = String(item.feedback || "").trim();
						return (
							<button
								key={item._id || i}
								type="button"
								onClick={() => setSelected(item)}
								className="text-left rounded-2xl border border-white/10 bg-primary2/70 p-4 hover:border-accent2/40 transition-all space-y-3"
							>
								<div className="flex items-center justify-between gap-2">
									<Stars value={rating} />
									<span className="text-[11px] text-white/35">
										{rating}/5
									</span>
								</div>
								<p className="text-sm text-white/65 line-clamp-3 min-h-[3.5rem] leading-relaxed">
									{text || (
										<span className="italic opacity-40">
											Rating only — no written note
										</span>
									)}
								</p>
								{item.date && (
									<p className="text-[11px] text-white/35">
										{new Date(item.date).toLocaleString()}
									</p>
								)}
							</button>
						);
					})}
				</div>
			)}

			{selected && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
					onClick={() => setSelected(null)}
				>
					<div
						className="w-full max-w-md bg-primary2 border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-6 space-y-4"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-start justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-[0.2em] text-accent2 mb-2">
									Feedback detail
								</p>
								<Stars value={Number(selected.rating) || 0} size={18} />
								<p className="text-sm text-white/50 mt-2">
									{Number(selected.rating) || 0} / 5 stars
								</p>
							</div>
							<button
								type="button"
								onClick={() => setSelected(null)}
								className="p-2 rounded-lg hover:bg-white/5"
							>
								<X size={18} />
							</button>
						</div>
						<div className="rounded-xl bg-primary/50 border border-white/10 p-4 text-sm text-white/80 leading-relaxed whitespace-pre-wrap min-h-[5rem]">
							{String(selected.feedback || "").trim() || (
								<span className="italic opacity-40">
									No written feedback given.
								</span>
							)}
						</div>
						{selected.date && (
							<p className="text-xs text-white/40">
								{new Date(selected.date).toLocaleString()}
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default FeedbackAdmin;
