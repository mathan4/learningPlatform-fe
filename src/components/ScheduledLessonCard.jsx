import { useState } from "react";
import { toast } from "react-toastify";
import lessonServices from "../services/lessonService";
import reviewService from "../services/reviewService";

const ScheduledLessonCard = ({ lesson, handleDelete }) => {
  const { subject, startTime, mentorId, status, _id, meetingLink ,studentId} = lesson;
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: ""
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  
  const handleCancel = async () => {
    try {
      await lessonServices.cancelLesson(_id);
      toast.success("Lesson cancelled!");
      handleDelete(_id);
    } catch (err) {
      toast.error("Failed to cancel lesson.");
      console.error(err);
    }
  };

  const handleCreateReview = async () => {
    if (!reviewData.comment.trim()) {
      toast.error("Please provide a comment for your review.");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const reviewPayload = {
        lessonId: _id,
        studentId: studentId,
        mentorId: mentorId._id,
        rating: reviewData.rating,
        comment: reviewData.comment.trim()
      };
      console.log(reviewPayload)
      await reviewService.createReview(reviewPayload);
      toast.success("Review submitted successfully!");
      setShowReviewModal(false);
      setReviewData({ rating: 5, comment: "" });
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error("You have already reviewed this lesson.");
      } else {
        toast.error("Failed to submit review.");
      }
      console.error(err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleRatingChange = (rating) => {
    setReviewData(prev => ({ ...prev, rating }));
  };

  return (
    <>
      <div className="p-4 shadow-md rounded-lg flex flex-col sm:flex-row bg-gradient-to-b from-white to bg-gray-300 justify-between items-start sm:items-center">
        <div>
          <h3 className="text-lg font-semibold text-indigoCustom">{subject}</h3>
          <p className="text-gray-600">Mentor: {mentorId?.firstName}</p>
          <p className="text-gray-600">
            {new Date(startTime).toLocaleDateString()} at{" "}
            {new Date(startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          {status && (
            <p className="text-sm text-gray-500 mt-1">Status: {status}</p>
          )}
          
          {meetingLink && status !== "completed" && (
            <a
              href={meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-celestialBlue to-africanViolet text-transparent bg-clip-text hover:text-africanViolet underline mt-auto transition-colors"
            >
              Join Zoom Meeting
            </a>
          )}
        </div>

        <div className="mt-3 sm:mt-0 flex gap-2">
          {status === "completed" ? (
            <button
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => setShowReviewModal(true)}
            >
              Create Review
            </button>
          ) : (
            <button
              className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Review Lesson</h3>
            
            {/* Rating Stars */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating:
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className={`text-2xl ${
                      star <= reviewData.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    } hover:text-yellow-400 transition-colors`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment:
              </label>
              <textarea
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData(prev => ({ ...prev, comment: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Share your experience with this lesson..."
                required
              />
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setReviewData({ rating: 5, comment: "" });
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                disabled={isSubmittingReview}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateReview}
                disabled={isSubmittingReview}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isSubmittingReview ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduledLessonCard;