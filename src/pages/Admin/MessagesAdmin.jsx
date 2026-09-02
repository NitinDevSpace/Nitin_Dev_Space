import React, { useEffect, useMemo, useState } from "react";
import { getMessages } from "../../services/contact.service";
import { Inbox, Mail, Phone, RefreshCw, X } from "lucide-react";
import { Skeleton } from "../../components/Loading";
import { createdAtFromDoc } from "../../utils/text";

function MessagesAdmin() {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState(null);
	const [query, setQuery] = useState("");

	const getData = async () => {
		setLoading(true);
		try {
			const allMessages = await getMessages();
			setMessages(allMessages?.data || []);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return messages;
		return messages.filter((m) =>
			[m.fullName, m.email, m.subject, m.message, m.phoneNumber]
				.filter(Boolean)
				.some((v) => String(v).toLowerCase().includes(q))
		);
	}, [messages, query]);

	return (
		<div className="space-y-5">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<h2 className="text-2xl font-semibold">Messages</h2>
					<p className="text-sm opacity-60 mt-1">
						Contact form inbox. Open a card to read the full message.
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

			<div className="flex flex-wrap items-center gap-3">
				<div className="inline-flex items-center gap-2 text-accent2 text-sm">
					<Inbox size={16} />
					{loading
						? "Loading..."
						: `${filtered.length} of ${messages.length}`}
				</div>
				<input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search name, email, subject..."
					className="admin-field max-w-sm"
				/>
			</div>

			{loading ? (
				<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
					{[0, 1, 2, 3, 4, 5].map((i) => (
						<div
							key={i}
							className="rounded-2xl border border-white/10 bg-primary2/50 p-4 space-y-3"
						>
							<Skeleton className="h-5 w-36" />
							<Skeleton className="h-4 w-24 rounded-full" />
							<Skeleton className="h-12 w-full" />
						</div>
					))}
				</div>
			) : filtered.length === 0 ? (
				<div className="rounded-xl border border-dashed border-white/15 bg-primary2/40 py-16 text-center text-sm opacity-50">
					{messages.length === 0
						? "No messages yet."
						: "No messages match your search."}
				</div>
			) : (
				<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
					{filtered.map((msg, i) => {
						const when = createdAtFromDoc(msg);
						return (
							<button
								key={msg._id || i}
								type="button"
								onClick={() => setSelected(msg)}
								className="text-left rounded-2xl border border-white/10 bg-primary2/70 p-4 hover:border-accent2/40 transition-all space-y-3"
							>
								<div className="flex items-start justify-between gap-3">
									<p className="font-semibold line-clamp-1">
										{msg.fullName || "Unknown"}
									</p>
									{when && (
										<span className="text-[10px] text-white/35 shrink-0">
											{when.toLocaleDateString()}
										</span>
									)}
								</div>
								<span className="inline-block text-[11px] px-2.5 py-1 rounded-full bg-accent1/15 text-accent1 line-clamp-1 max-w-full">
									{msg.subject || "No subject"}
								</span>
								<p className="text-xs text-white/55 line-clamp-3 leading-relaxed">
									{msg.message || "No message provided."}
								</p>
								<p className="text-[11px] text-white/35 truncate">
									{msg.email || "No email"}
								</p>
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
						className="w-full max-w-lg bg-primary2 border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90dvh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-start justify-between gap-3">
							<div>
								<h3 className="text-xl font-semibold">
									{selected.fullName || "Unknown"}
								</h3>
								<p className="text-sm text-accent2 mt-1">
									{selected.subject || "No subject"}
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

						<div className="space-y-2 text-sm text-white/70">
							<p className="flex items-center gap-2">
								<Mail size={14} className="text-accent1" />
								{selected.email || "N/A"}
							</p>
							{selected.phoneNumber && (
								<p className="flex items-center gap-2">
									<Phone size={14} className="text-accent1" />
									{selected.phoneNumber}
								</p>
							)}
							{createdAtFromDoc(selected) && (
								<p className="text-xs text-white/40">
									{createdAtFromDoc(selected).toLocaleString()}
								</p>
							)}
						</div>

						<div className="rounded-xl bg-primary/50 border border-white/10 p-4 text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
							{selected.message || "No message provided."}
						</div>

						{selected.email && (
							<a
								href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(
									selected.subject || "Your message"
								)}`}
								className="inline-flex items-center gap-2 bg-accent2 text-black font-semibold px-4 py-2 rounded-lg text-sm"
							>
								Reply by email
							</a>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default MessagesAdmin;
