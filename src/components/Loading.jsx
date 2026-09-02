import React from "react";

export function Skeleton({ className = "" }) {
	return (
		<div
			className={`relative overflow-hidden rounded-md bg-white/10 ${className}`}
			aria-hidden="true"
		>
			<div className="nd-loading-shimmer" />
		</div>
	);
}

export function SkeletonText({ lines = 3, className = "" }) {
	return (
		<div className={`space-y-2 ${className}`}>
			{Array.from({ length: lines }).map((_, i) => (
				<Skeleton
					key={i}
					className={`h-3 ${i === lines - 1 ? "w-2/3" : "w-full"}`}
				/>
			))}
		</div>
	);
}

export function ProjectsGridSkeleton({ count = 8 }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-11/12 mx-auto mb-16">
			{Array.from({ length: count }).map((_, i) => (
				<div
					key={i}
					className="aspect-square rounded-xl border border-white/10 bg-primary2 overflow-hidden p-0 relative"
				>
					<Skeleton className="absolute inset-0 rounded-xl" />
					<div className="absolute bottom-0 inset-x-0 p-4 space-y-2">
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-3 w-full" />
						<div className="flex gap-2">
							<Skeleton className="h-5 w-12 rounded-full" />
							<Skeleton className="h-5 w-12 rounded-full" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export function ProfileSkeleton() {
	return (
		<div className="flex flex-col gap-6 sm:gap-8 w-full items-stretch">
			{[1, 2, 3, 4].map((section) => (
				<div
					key={section}
					className="border border-white/10 rounded-xl bg-primary2/60 overflow-hidden"
				>
					<div className="border-b border-white/10 p-5 sm:p-6">
						<Skeleton className="h-6 w-48 sm:w-56" />
					</div>
					<div className="p-5 sm:p-8 space-y-6">
						{Array.from({ length: section === 2 ? 3 : 2 }).map((_, i) => (
							<div key={i} className="space-y-3">
								<Skeleton className="h-5 w-40 max-w-full" />
								<Skeleton className="h-6 w-2/3 max-w-full" />
								<SkeletonText lines={3} />
								{section === 2 && (
									<div className="flex flex-wrap gap-2 pt-1">
										{Array.from({ length: 8 }).map((__, j) => (
											<Skeleton key={j} className="h-6 w-16 rounded-full" />
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export function BlogsGridSkeleton({ count = 6 }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{Array.from({ length: count }).map((_, i) => (
				<div
					key={i}
					className="bg-primary2 rounded-lg border border-white/10 overflow-hidden"
				>
					<Skeleton className="w-full h-48 rounded-none" />
					<div className="p-6 space-y-3">
						<div className="flex gap-2">
							<Skeleton className="h-5 w-14 rounded-full" />
							<Skeleton className="h-5 w-14 rounded-full" />
						</div>
						<Skeleton className="h-6 w-4/5" />
						<SkeletonText lines={3} />
						<div className="flex justify-between items-center pt-2">
							<Skeleton className="h-3 w-12" />
							<Skeleton className="h-9 w-24 rounded-lg" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export function BlogPostSkeleton() {
	return (
		<div className="bg-primary">
			<div className="relative w-full h-[46vh] min-h-[280px] mt-16">
				<Skeleton className="absolute inset-0 rounded-none" />
			</div>
			<div className="md:w-5/6 mx-auto px-4 md:px-0 py-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-8">
				<div className="space-y-4">
					<Skeleton className="h-24 w-full rounded-lg" />
					<Skeleton className="h-6 w-3/4" />
					<SkeletonText lines={8} />
					<Skeleton className="h-24 w-full rounded-lg" />
				</div>
				<div className="space-y-6">
					<Skeleton className="h-64 w-full rounded-lg" />
					<Skeleton className="h-64 w-full rounded-lg" />
				</div>
			</div>
		</div>
	);
}

export function ProjectPageSkeleton() {
	return (
		<div className="bg-primary">
			<div className="relative w-full h-[52vh] min-h-[320px] mt-16">
				<Skeleton className="absolute inset-0 rounded-none" />
			</div>
			<div className="bg-primary2 md:w-5/6 mx-auto shadow-2xl px-6 md:px-12 py-12 mb-16 space-y-6">
				<div className="flex gap-3">
					<Skeleton className="h-10 w-28 rounded-full" />
					<Skeleton className="h-10 w-28 rounded-full" />
				</div>
				<Skeleton className="h-6 w-2/3" />
				<SkeletonText lines={7} />
				<div className="flex flex-wrap gap-2">
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton key={i} className="h-8 w-20 rounded" />
					))}
				</div>
			</div>
		</div>
	);
}

export function CreationsSkeleton() {
	return (
		<div className="w-full h-full flex items-center gap-4 sm:gap-7 px-3 sm:px-4 overflow-hidden">
			{[0, 1, 2].map((i) => (
				<div
					key={i}
					className="shrink-0 w-[min(340px,calc(100vw-3rem))] h-[min(390px,72vw)] rounded-2xl border border-white/10 overflow-hidden bg-primary2"
				>
					<Skeleton className="w-full h-[45%] rounded-none" />
					<div className="p-3 sm:p-4 space-y-3">
						<Skeleton className="h-5 w-4/5" />
						<SkeletonText lines={3} />
						<div className="flex gap-2">
							<Skeleton className="h-5 w-12 rounded-full" />
							<Skeleton className="h-5 w-12 rounded-full" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export function DashboardSkeleton() {
	return (
		<div className="flex flex-col gap-8">
			<div className="space-y-2">
				<Skeleton className="h-8 w-40" />
				<Skeleton className="h-4 w-72" />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
				{Array.from({ length: 6 }).map((_, i) => (
					<div
						key={i}
						className="bg-primary2 border border-white/10 rounded-xl p-5 space-y-4"
					>
						<div className="flex justify-between">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-5 w-5 rounded" />
						</div>
						<Skeleton className="h-9 w-16" />
						<Skeleton className="h-3 w-28" />
					</div>
				))}
			</div>
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
				{Array.from({ length: 4 }).map((_, i) => (
					<div
						key={i}
						className="bg-primary2 border border-white/10 rounded-xl p-5"
					>
						<Skeleton className="h-5 w-40 mb-4" />
						<Skeleton className="h-56 w-full rounded-lg" />
					</div>
				))}
			</div>
		</div>
	);
}

// Backward-compatible default export
export default function Loading({ size = "40rem", className = "opacity-60" }) {
	const style =
		typeof size === "number"
			? { width: `${size}px`, height: `${size}px` }
			: { width: size, height: size };

	return (
		<div
			className={`rounded-md relative overflow-hidden bg-white/10 ${className}`}
			style={style}
			role="status"
			aria-label="Loading"
		>
			<div className="nd-loading-shimmer" aria-hidden="true" />
		</div>
	);
}
