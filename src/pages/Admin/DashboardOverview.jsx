import React, { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Sector,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import {
	FolderGit2,
	Logs,
	Mail,
	Star,
	FileText,
	MessageSquareHeart,
} from "lucide-react";
import { getStats } from "../../services/stats.service";
import { DashboardSkeleton } from "../../components/Loading";

const COLORS = ["#e1b666", "#0793e8", "#be4673", "#ff8b60", "#add6e9", "#3F567F"];

function StatCard({ icon, label, value, hint, onClick }) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={!onClick}
			className={`text-left bg-primary2 border border-white/10 rounded-xl p-5 shadow-xl transition-transform duration-300 ${
				onClick
					? "hover:scale-105 hover:border-accent2/50 cursor-pointer"
					: "cursor-default"
			}`}
		>
			<div className="flex items-center justify-between mb-3">
				<p className="text-sm text-white/50">{label}</p>
				{icon &&
					React.createElement(icon, { className: "text-accent2", size: 18 })}
			</div>
			<p className="text-3xl font-semibold">{value}</p>
			{hint && <p className="text-xs text-white/40 mt-2">{hint}</p>}
		</button>
	);
}

function renderActiveShape(props) {
	const {
		cx,
		cy,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		value,
	} = props;
	return (
		<g>
			<text
				x={cx}
				y={cy - 8}
				textAnchor="middle"
				fill="#e1b666"
				fontSize={14}
				fontWeight={600}
			>
				{payload.name}
			</text>
			<text x={cx} y={cy + 14} textAnchor="middle" fill="#ffffffcc" fontSize={13}>
				{value} ratings
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius + 12}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 14}
				outerRadius={outerRadius + 18}
				fill={fill}
			/>
		</g>
	);
}

function DashboardOverview({ onNavigate }) {
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		async function load() {
			setLoading(true);
			const res = await getStats();
			setStats(res?.data || null);
			setLoading(false);
		}
		load();
	}, []);

	if (loading) return <DashboardSkeleton />;
	if (!stats) return <p className="opacity-70">Could not load analytics.</p>;

	const { totals } = stats;
	const ratingData = (stats.ratingBuckets || []).filter((b) => b.value > 0);
	const pieData = ratingData.length ? ratingData : stats.ratingBuckets;

	return (
		<div className="flex flex-col gap-8">
			<div>
				<h2 className="text-2xl font-semibold">Overview</h2>
				<p className="text-sm opacity-60 mt-1">
					Live snapshot of content, messages, and engagement.
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
				<StatCard
					icon={FolderGit2}
					label="Projects"
					value={totals.projects}
					hint={`${totals.keyProjects} marked as key · open section`}
					onClick={() => onNavigate?.("projects")}
				/>
				<StatCard
					icon={Logs}
					label="Blogs"
					value={totals.blogs}
					hint={`${totals.publishedBlogs} published · open section`}
					onClick={() => onNavigate?.("blogs")}
				/>
				<StatCard
					icon={Mail}
					label="Messages"
					value={totals.messages}
					hint="Contact form inbox · open section"
					onClick={() => onNavigate?.("messages")}
				/>
				<StatCard
					icon={Star}
					label="Avg. Feedback"
					value={totals.avgRating || "—"}
					hint={`${totals.feedbacks} responses · open section`}
					onClick={() => onNavigate?.("feedback")}
				/>
				<StatCard
					icon={FileText}
					label="Resume"
					value={totals.hasResume ? "Live" : "Missing"}
					hint={stats.resume?.filename || "Upload from Resume tab"}
					onClick={() => onNavigate?.("resume")}
				/>
				<StatCard
					icon={MessageSquareHeart}
					label="Feedbacks"
					value={totals.feedbacks}
					hint="Open feedback inbox"
					onClick={() => onNavigate?.("feedback")}
				/>
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
				<div className="bg-primary2 border border-white/10 rounded-xl p-5">
					<h3 className="mb-4 text-accent2">Projects by status</h3>
					<div className="h-64">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={stats.projectsByStatus}>
								<CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
								<XAxis dataKey="name" stroke="#add6e9" fontSize={12} />
								<YAxis stroke="#add6e9" allowDecimals={false} />
								<Tooltip
									contentStyle={{
										background: "#070d27",
										border: "1px solid #ffffff22",
									}}
								/>
								<Bar dataKey="value" radius={[6, 6, 0, 0]}>
									{stats.projectsByStatus.map((_, i) => (
										<Cell key={i} fill={COLORS[i % COLORS.length]} />
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="bg-primary2 border border-white/10 rounded-xl p-5">
					<h3 className="mb-4 text-accent2">Messages · last 6 months</h3>
					<div className="h-64">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={stats.messagesOverTime}>
								<CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
								<XAxis dataKey="month" stroke="#add6e9" fontSize={12} />
								<YAxis stroke="#add6e9" allowDecimals={false} />
								<Tooltip
									contentStyle={{
										background: "#070d27",
										border: "1px solid #ffffff22",
									}}
								/>
								<Line
									type="monotone"
									dataKey="count"
									stroke="#e1b666"
									strokeWidth={2}
									dot={{ fill: "#e1b666" }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="bg-primary2 border border-white/10 rounded-xl p-5">
					<h3 className="mb-4 text-accent2">Feedback ratings</h3>
					<div className="h-72">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									activeIndex={activeIndex}
									activeShape={renderActiveShape}
									data={pieData}
									dataKey="value"
									nameKey="name"
									innerRadius={55}
									outerRadius={85}
									paddingAngle={3}
									onMouseEnter={(_, index) => setActiveIndex(index)}
									label={({ name, value }) =>
										value > 0 ? `${name} (${value})` : ""
									}
									labelLine={{ stroke: "#ffffff55" }}
								>
									{pieData.map((_, i) => (
										<Cell key={i} fill={COLORS[i % COLORS.length]} />
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										background: "#070d27",
										border: "1px solid #ffffff22",
									}}
								/>
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="bg-primary2 border border-white/10 rounded-xl p-5">
					<h3 className="mb-4 text-accent2">Recent messages</h3>
					<div className="space-y-3 max-h-64 overflow-y-auto allow-scroll">
						{(stats.recentMessages || []).length === 0 ? (
							<p className="text-sm opacity-50">No messages yet.</p>
						) : (
							stats.recentMessages.map((msg) => (
								<button
									key={msg._id}
									type="button"
									onClick={() => onNavigate?.("messages")}
									className="w-full text-left border border-white/10 rounded-lg p-3 bg-primary/50 hover:border-accent2/40 transition-colors"
								>
									<p className="font-medium text-sm">
										{msg.fullName || "Unknown"}
									</p>
									<p className="text-xs text-accent2">{msg.subject}</p>
									<p className="text-xs opacity-60 line-clamp-2 mt-1">
										{msg.message}
									</p>
								</button>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardOverview;
