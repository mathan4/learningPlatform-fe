import { useState } from "react";
import paymentService from "../services/paymentService";
import courseServices from "../services/courseService";
import { useRouteLoaderData } from "react-router-dom";

const BookCourseModal = ({ course, onClose }) => {
  const user = useRouteLoaderData("dashboard");
  const URL = import.meta.env.VITE_URL;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const enrolledCount = course.enrolledStudents?.length || 0;
  const maxStudents = course.enrollmentSettings?.maxStudents || 0;
  const availableSeats = maxStudents - enrolledCount;

  const handleEnroll = async () => {
    setLoading(true);
    setError(null);

    try {
      if (availableSeats <= 0) {
        setError("This course is fully booked.");
        setLoading(false);
        return;
      }

      const res = await courseServices.enrollInCourse(course._id);

      console.log(res);

      // Save pending enrollment ID
      await sessionStorage.setItem("pendingCourse", res.course._id);

      const checkoutData = {
        courseId: course._id,
        studentId: user.user._id,
        mentorId: res.course.mentorId,
        amount: course.pricing.totalPrice,
        successUrl: `${URL}/course-payment-success`,
        cancelUrl: `${URL}/course-payment-cancel`,
        type: "course",
      };

      // Initiate Stripe checkout
      const response = await paymentService.createCheckoutSession(checkoutData);

      // Redirect to Stripe checkout
      window.location.href = response.data.url;
    } catch (err) {
      console.error(err);
      setError("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-offWhite rounded-2xl shadow-lg max-w-lg w-full p-6 mx-4 relative border border-papayaWhip">
        <h2 className="text-2xl font-bold text-indigoCustom mb-4">
          {course.title}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2 text-blackCustom text-sm">
          <p>
            <span className="font-semibold">Mentor:</span>{" "}
            {course.mentorId?.firstName || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Subject:</span> {course.subject}
          </p>
          <p>
            <span className="font-semibold">Level:</span> {course.level}
          </p>
          <p>
            <span className="font-semibold">Available Seats:</span>{" "}
            {availableSeats}
          </p>
          <p>
            <span className="font-semibold">Price:</span> $
            {course.pricing.totalPrice}
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleEnroll}
            disabled={loading || availableSeats <= 0}
            className="bg-celestialBlue hover:bg-[#0479bb] text-white px-4 py-2 rounded-xl font-semibold flex-1 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay & Enroll"}
          </button>
          <button
            onClick={onClose}
            className="bg-africanViolet hover:bg-[#946891] text-white px-4 py-2 rounded-xl font-semibold flex-1 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCourseModal;
