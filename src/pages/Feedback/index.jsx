import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { submitFeedback } from "../../services/feedback.service";

const Feedback = ({ onClose }) => {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const [feedback, setFeedback] = useState("");
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async () => {
		setError("");

		// At least one: rating OR feedback required
		if (rating === 0 && !feedback.trim()) {
			setError("Please provide a rating or write feedback before submitting.");
			return;
		}

		setLoading(true);

		const payload = {
			rating: rating,
			feedback: feedback,
			date: new Date().toISOString(),
		};

		try {
			const res = await submitFeedback(payload);
			if (!res.success) {
				throw new Error("Failed to submit feedback");
			}

			setSubmitted(true);
		} catch (error) {
			console.error("Error submitting feedback", error);
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xl flex items-center justify-center p-4"
			onClick={onClose}
		>
			<div
				className="bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center border border-white/10 relative"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-white/70 hover:text-white text-xl"
				>
					✕
				</button>
				{!submitted ? (
					<>
						<h1 className="text-3xl font-bold text-white mb-4">
							Share Your Feedback ⭐
						</h1>

						<p className="text-white/80 mb-8">
							Your thoughts help improve this website. I appreciate your
							feedback!
						</p>

						{/* Star Rating */}
						<div className="flex justify-center mb-6">
							{[1, 2, 3, 4, 5].map((star) => (
								<span
									key={star}
									onClick={() => setRating(star)}
									onMouseEnter={() => setHover(star)}
									onMouseLeave={() => setHover(0)}
									className={`text-4xl cursor-pointer transition ${
										(hover || rating) >= star
											? "text-yellow-400"
											: "text-gray-400"
									}`}
								>
									★
								</span>
							))}
						</div>

						<textarea
							placeholder="Write your feedback here..."
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
							className="w-full p-4 rounded-xl h-40 resize-none border border-white/40 bg-primary focus:outline-none focus:ring-1 focus:ring-white shadow-md"
						></textarea>
						{error && <p className="text-red-400 text-sm mt-3">{error}</p>}

						<button
							onClick={handleSubmit}
							disabled={loading}
							className={`mt-6 px-6 py-3 rounded-xl shadow-lg font-semibold transition-all 
              ${
								loading
									? "bg-gray-400 cursor-not-allowed"
									: "bg-accent2 hover:scale-105 text-black"
							}
            `}
						>
							{loading ? "Submitting..." : "Submit Feedback"}
						</button>
					</>
				) : (
					<div className="flex flex-col items-center justify-center py-10">
						<CheckCircle className="w-16 h-16 text-green-400 mb-4" />
						<h2 className="text-2xl font-bold text-white mb-2">
							Feedback Submitted!
						</h2>
						<p className="text-white/70">
							Thank you for taking the time to share your thoughts.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Feedback;
