import React from "react";
import { motion } from "framer-motion";
import {
	Code,
	Codesandbox,
	Database,
	Lightbulb,
	PenLine,
	Server,
	Star,
	Zap,
} from "lucide-react";

const iconMap = {
	Code,
	Server,
	Zap,
	Database,
	Codesandbox,
	PenLine,
	Lightbulb,
	Star,
};

const skillTagClass =
	"inline-block text-white/80 border border-accent1 px-3 py-1 m-1 rounded-full text-xs font-semibold";

function SkillsPanel({ categories = [] }) {
	if (!categories.length) {
		return (
			<p className="p-6 opacity-60 text-sm">
				Skills will appear here once they are added in the admin dashboard.
			</p>
		);
	}

	return (
		<div className="space-y-5 p-5 sm:p-6">
			<div className="flex flex-col gap-6 text-sm font-extralight">
				{categories.map((category, cIdx) => {
					const Icon = iconMap[category.icon] || Star;
					return (
						<motion.div
							key={`${category.name}-${cIdx}`}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{ duration: 0.45, delay: cIdx * 0.04 }}
						>
							<span className="flex gap-4 text-lg mr-4 font-bold text-accent2">
								<Icon strokeWidth={2} className="text-orange" /> {category.name}:
							</span>
							<motion.div
								className="p-3 mt-2 ml-4 sm:ml-10 rounded-lg w-fit flex flex-wrap"
								style={{ transformStyle: "preserve-3d" }}
								whileHover={{ rotateX: 4, rotateY: -6 }}
							>
								{(category.skills || []).map((skill, sIdx) => (
									<motion.span
										key={skill}
										className={skillTagClass}
										initial={{ opacity: 0, scale: 0.85 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: false }}
										transition={{ delay: sIdx * 0.015 }}
									>
										{skill}
									</motion.span>
								))}
							</motion.div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}

export default SkillsPanel;
