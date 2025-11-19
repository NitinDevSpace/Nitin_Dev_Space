import React from "react";

/**
 * FeedbackBox Component
 * ----------------------
 * Displays a single feedback entry.
 * Props:
 *  - feedback: object containing
 *      {
 *        rating: number,
 *        message?: string
 *        date?: string
 *      }
 */

const FeedbackBox = ({ feedbackObj }) => {
  if (!feedbackObj) {
    return (
      <div className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4 text-white">User Feedback</h2>
        <p className="text-gray-400 text-sm">No feedback available.</p>
      </div>
    );
  }

  const { rating, feedback, date } = feedbackObj;

  return (
    <div className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-white">User Feedback</h2>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-yellow-400 text-lg">★</span>
        <span className="text-gray-200 font-medium">{rating}/5</span>
      </div>

      {/* feedback or "No feedback" */}
      {feedback && feedback.trim() !== "" ? (
        <p className="text-gray-300 text-sm leading-relaxed">{feedback}</p>
      ) : (
        <p className="text-gray-500 text-sm italic">No written feedback given.</p>
      )}

      {/* Date */}
      {date && (
        <p className="text-gray-500 text-xs mt-3">
          {new Date(date).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default FeedbackBox;