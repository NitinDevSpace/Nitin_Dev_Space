import React, { useEffect, useRef, useState } from "react";
import { Download, Eye, FileText, FileUp, RefreshCw } from "lucide-react";
import {
	getResumeMeta,
	resumeFileUrl,
	uploadResume,
} from "../../services/resume.service";
import { Skeleton } from "../../components/Loading";

function ResumeAdmin() {
	const [meta, setMeta] = useState(null);
	const [status, setStatus] = useState("");
	const [uploading, setUploading] = useState(false);
	const [loading, setLoading] = useState(true);
	const [dragOver, setDragOver] = useState(false);
	const inputRef = useRef(null);

	const load = async () => {
		setLoading(true);
		try {
			const res = await getResumeMeta();
			setMeta(res?.data || null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
	}, []);

	const uploadFile = async (file) => {
		if (!file) return;
		if (file.type !== "application/pdf") {
			setStatus("Please upload a PDF file.");
			return;
		}
		setUploading(true);
		setStatus("");
		try {
			const res = await uploadResume(file);
			setStatus(
				res?.success ? "Resume replaced — live on Profile" : "Upload failed"
			);
			await load();
		} catch {
			setStatus("Upload failed. Keep the file under 4MB.");
		} finally {
			setUploading(false);
		}
	};

	const onFile = async (e) => {
		const file = e.target.files?.[0];
		await uploadFile(file);
		e.target.value = "";
	};

	const onDrop = async (e) => {
		e.preventDefault();
		setDragOver(false);
		const file = e.dataTransfer.files?.[0];
		await uploadFile(file);
	};

	return (
		<div className="space-y-5">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<h2 className="text-2xl font-semibold">Resume</h2>
					<p className="text-sm opacity-60 mt-1">
						PDF served by the Download Resume button on /profile.
					</p>
				</div>
				<button
					type="button"
					onClick={load}
					className="inline-flex items-center gap-2 text-sm border border-white/15 px-3 py-2 rounded-lg hover:border-accent2/40"
				>
					<RefreshCw size={14} /> Refresh
				</button>
			</div>

			<div className="grid lg:grid-cols-2 gap-6 items-start">
				<div className="bg-primary2/70 border border-white/10 rounded-xl p-5 sm:p-6 space-y-5">
					<p className="text-xs uppercase tracking-[0.2em] text-accent2">
						Current file
					</p>

					{loading ? (
						<div className="space-y-3">
							<Skeleton className="h-16 w-full rounded-xl" />
							<Skeleton className="h-28 w-full rounded-xl" />
						</div>
					) : (
						<>
							<div className="rounded-xl border border-white/10 bg-primary/40 p-4 flex items-start gap-3">
								<div className="w-11 h-11 rounded-xl bg-accent2/15 text-accent2 flex items-center justify-center shrink-0">
									<FileText size={20} />
								</div>
								<div className="min-w-0">
									{meta ? (
										<>
											<p className="font-medium truncate">{meta.filename}</p>
											<p className="text-xs opacity-50 mt-1">
												Updated{" "}
												{meta.uploadedAt
													? new Date(meta.uploadedAt).toLocaleString()
													: "recently"}
											</p>
										</>
									) : (
										<>
											<p className="font-medium">No resume uploaded yet</p>
											<p className="text-xs opacity-50 mt-1">
												Upload a PDF to replace the static fallback file.
											</p>
										</>
									)}
								</div>
							</div>

							<div
								onDragOver={(e) => {
									e.preventDefault();
									setDragOver(true);
								}}
								onDragLeave={() => setDragOver(false)}
								onDrop={onDrop}
								className={`rounded-2xl border border-dashed p-8 text-center transition-colors ${
									dragOver
										? "border-accent2 bg-accent2/10"
										: "border-white/15 bg-primary/30"
								}`}
							>
								<FileUp
									size={28}
									className="mx-auto mb-3 text-accent2 opacity-80"
								/>
								<p className="text-sm font-medium mb-1">
									{uploading ? "Uploading..." : "Drop a PDF here"}
								</p>
								<p className="text-xs text-white/40 mb-4">
									or choose a file · max ~4MB
								</p>
								<button
									type="button"
									disabled={uploading}
									onClick={() => inputRef.current?.click()}
									className="inline-flex items-center gap-2 bg-accent2 text-black px-4 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60"
								>
									<FileUp size={16} />
									{uploading ? "Uploading..." : "Choose PDF"}
								</button>
								<input
									ref={inputRef}
									type="file"
									accept="application/pdf"
									className="hidden"
									disabled={uploading}
									onChange={onFile}
								/>
							</div>
						</>
					)}

					{status && <p className="text-sm text-accent2">{status}</p>}
				</div>

				<div className="bg-primary border border-white/10 rounded-xl p-5 sm:p-6 lg:sticky lg:top-28">
					<p className="text-xs uppercase tracking-[0.2em] text-accent2 mb-4 flex items-center gap-2">
						<Eye size={14} /> Where this appears · Profile
					</p>
					<div className="rounded-xl border border-accent2/20 bg-primary2/80 p-6 text-center space-y-4">
						<h3 className="text-xl sm:text-2xl font-semibold">
							My <span className="text-accent2">Professional Journey</span>
						</h3>
						<p className="text-xs opacity-50 max-w-xs mx-auto leading-relaxed">
							Visitors on /profile use this button to download whatever PDF is
							stored here.
						</p>
						<a
							href={resumeFileUrl}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 bg-accent2 text-black px-4 py-2.5 rounded-lg text-sm font-semibold"
						>
							<Download size={16} /> Download Resume
						</a>
						{meta?.filename && (
							<p className="text-[11px] opacity-40 truncate">
								Serving: {meta.filename}
							</p>
						)}
					</div>
					<a
						href={resumeFileUrl}
						target="_blank"
						rel="noreferrer"
						className="mt-4 inline-flex w-full items-center justify-center gap-2 text-sm border border-white/15 rounded-lg py-2.5 hover:border-accent2/40"
					>
						<Eye size={14} /> Open current PDF
					</a>
				</div>
			</div>
		</div>
	);
}

export default ResumeAdmin;
