import { useState } from "react";
import paymentService from "../services/paymentService";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import lessonServices from "../services/lessonService";
import { u } from "framer-motion/client";

const BookLessonModal = ({ mentor, onClose }) => {
  const [form, setForm] = useState({ subject: "", date: "", time: "" });
  const user = useRouteLoaderData("dashboard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      
      const res=await lessonServices.bookLesson({
        mentorId: mentor._id,
        studentId: user.user._id,
        subject: form.subject,
        date: form.date,
        time: form.time,
      });
      console.log(res.data)
      const checkoutData = {
        mentorId: mentor._id,
        amount: res.data.price,
        studentId: user.user._id,
        lessonId: res.data._id,
        successUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-cancel`
      };

      const response = await paymentService.createCheckoutSession(checkoutData);
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
      setError("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4">Book with {mentor.firstName}</h3>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Subject"
          required
          value={form.subject}
          className="border p-2 mb-2 w-full rounded"
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <input
          type="date"
          required
          value={form.date}
          className="border p-2 mb-2 w-full rounded"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="time"
          required
          value={form.time}
          className="border p-2 mb-4 w-full rounded"
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">
            You will be redirected to secure payment processing.
            Your lesson will be booked after successful payment.
          </p>
          <p className="font-semibold mt-2">
            Amount: ${mentor.price || mentor.hourlyRate}
          </p>
        </div>

        <div className="flex justify-between gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 flex-1"
          >
            {loading ? "Processing..." : "Pay & Book Lesson"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookLessonModal;
