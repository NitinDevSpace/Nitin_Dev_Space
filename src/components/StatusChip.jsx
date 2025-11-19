import React from "react";

const statusColors = {
	"Completed": "bg-green-500",
	"In Progress": "bg-yellow-600",
	"Planned": "bg-blue-500",
	"On Hold": "bg-red-500"
};

function StatusChip({ status }) {
	// Normalize status safely
	const normalizedStatus = typeof status === "string" ? status.trim() : "";

	const colorClass = statusColors[normalizedStatus] || "bg-pink-500";

	return (
		<span
			className={`absolute top-2 right-3 px-4 rounded text-sm font-medium z-50 ${colorClass}`}
		>
			{status}
		</span>
	);
}

export default StatusChip;
