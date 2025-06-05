import React, { useState } from 'react';

import reviewService from '../services/reviewService';

const MentorCard = ({ mentor, onBookClick }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(mentor);

  const fetchReviews = async () => {
    if (showReviews) {
      // If reviews are already shown, hide them
      setShowReviews(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await reviewService.getReviews(mentor.userId._id);
      setReviews(response.data);
      setShowReviews(true);
    } catch (err) {
      setError('Failed to fetch reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="bg-white/10 border border-africanViolet rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-200">
      <h3 className="text-xl bg-gradient-to-b from-white to bg-gray-300 text-transparent bg-clip-text font-bold text-indigoCustom mb-2">
        {mentor.userId.firstName} {mentor.userId.lastName}
      </h3>

      <p className="text-sm text-white/75 mb-2">
        <span className="font-semibold text-africanViolet">Subjects:</span>{" "}
        {mentor.subjects.join(", ")}
      </p>

      <div className="text-sm text-white/75 mb-2">
        <span className="font-semibold text-africanViolet">Price:</span>{" "}
        ₹{mentor.hourlyRate} / session
      </div>

      <div className="text-sm text-white/75 mb-4">
        <span className="font-semibold text-africanViolet">Availability:</span>
        <ul className="list-disc list-inside mt-1 space-y-1">
          {mentor.availability.map((slot, idx) => (
            <li key={idx}>
              {slot.day}: {slot.startTime} - {slot.endTime}
            </li>
          ))}
        </ul>
      </div>

      {/* Rating Summary */}
      {reviews.length > 0 && (
        <div className="text-sm text-white/75 mb-3">
          <span className="font-semibold text-africanViolet">Rating:</span>{" "}
          <span className="text-yellow-400">{renderStars(Math.round(averageRating))}</span>
          <span className="ml-2">({averageRating}/5 from {reviews.length} reviews)</span>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <button
          onClick={onBookClick}
          className="bg-celestialBlue hover:bg-africanViolet text-white font-medium px-4 py-2 rounded-lg transition flex-1"
        >
          Book Class
        </button>
        
        <button
          onClick={fetchReviews}
          disabled={loading}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          {loading ? 'Loading...' : showReviews ? 'Hide Reviews' : 'Show Reviews'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-400 text-sm mb-3">
          {error}
        </div>
      )}

      {/* Reviews Section */}
      {showReviews && (
        <div className="border-t border-africanViolet pt-4 mt-4">
          <h4 className="text-lg font-semibold text-white mb-3">
            Reviews ({reviews.length})
          </h4>
          
          {reviews.length === 0 ? (
            <p className="text-white/60 text-sm">No reviews yet.</p>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white/5 rounded-lg p-3 border border-white/20"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-white text-sm">
                        {review.studentId?.name || 'Anonymous Student'}
                      </p>
                      <div className="text-yellow-400 text-sm">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-xs text-white/50">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {review.comment && (
                    <p className="text-white/80 text-sm">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MentorCard;