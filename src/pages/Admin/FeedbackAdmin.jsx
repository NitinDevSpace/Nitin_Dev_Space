import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { getAllFeedback } from "../../services/feedback.service";
import FeedbackBox from "../../components/FeedbackBox";

function FeedbackAdmin() {
	const [feedbacks, setFeedbacks] = useState([]);
	const [open, setOpen] = useState(false);

	const getData = async () => {
		const allFeedbacks = await getAllFeedback();

		setFeedbacks(allFeedbacks.data);
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<div className="bg-primary2 relative flex flex-col rounded-xl h-fit m-4 p-6 shadow-xl border border-white/10">
			{/* Heading Intro */}
			<div
				onClick={() => {
					setOpen(!open);
				}}
				className="flex"
			>
				<h1 className="pb-2 text-2xl border-b-2">Feedbacks</h1>
			</div>
			{/* Feedbacks */}
			<div>
				{open &&
					feedbacks.map((data, i) => {
						return <FeedbackBox key={i} feedbackObj={data} />;
					})}
			</div>
			<button
				onClick={() => {
					setOpen(!open);
				}}
				className="absolute top-4 right-5"
			>
				{open ? <ArrowUp /> : <ArrowDown />}
			</button>
		</div>
	);
}

export default FeedbackAdmin;
