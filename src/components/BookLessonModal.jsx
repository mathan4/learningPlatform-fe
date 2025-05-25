import { useState } from "react";
import lessonServices from "../services/lessonService";

const BookLessonModal = ({ mentor, onClose, fetchLessons }) => {
  const [form, setForm] = useState({ subject: "", date: "", time: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await lessonServices.bookLesson({
        mentorId: mentor._id,
        ...form,
      });
      alert("Lesson booked!");
      onClose();
      fetchLessons();
    } catch (error) {
      console.error(error);
      alert("Failed to book lesson.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Book with {mentor.firstName}</h3>
        <input
          type="text"
          placeholder="Subject"
          required
          className="border p-2 mb-2 w-full"
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <input
          type="date"
          required
          className="border p-2 mb-2 w-full"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="time"
          required
          className="border p-2 mb-4 w-full"
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookLessonModal;
