import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import lessonServices from "../../services/lessonService";
import mentorServices from "../../services/mentorServices";

const MentorDashboard = () => {
  const loaderData = useLoaderData();
  const [lessons, setLessons] = useState(loaderData.allLessons || []);
  const [earnings, setEarnings] = useState(loaderData.totalEarnings || 0);
  const [error, setError] = useState(loaderData.error || null);
  const [schedulingSet, setSchedulingSet] = useState(new Set());

  const fetchData = async () => {
    try {
      setError(null);
      const lessonsRes = await lessonServices.getMentorLessons();
      const lessonsData = lessonsRes?.data || lessonsRes || [];
      setLessons(Array.isArray(lessonsData) ? lessonsData : []);

      const earningsRes = await mentorServices.getMentorEarnings();
      const earningsData = earningsRes?.earnings || earningsRes?.data?.earnings || 0;
      setEarnings(typeof earningsData === "number" ? earningsData : 0);
    } catch (err) {
      console.error("Failed to refresh data:", err);
      setError("Failed to refresh data. Please try again.");
    }
  };

  const startScheduling = (lessonId) => setSchedulingSet(new Set(schedulingSet).add(lessonId));
  const stopScheduling = (lessonId) => {
    const newSet = new Set(schedulingSet);
    newSet.delete(lessonId);
    setSchedulingSet(newSet);
  };
  const isScheduling = (lessonId) => schedulingSet.has(lessonId);

  const cancelLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to cancel this lesson?")) return;
    startScheduling(lessonId);
    try {
      await lessonServices.cancelLesson(lessonId);
      alert("Lesson cancelled successfully.");
      await fetchData();
    } catch (error) {
      console.error("Failed to cancel lesson:", error);
      alert("Failed to cancel the lesson. Please try again.");
    } finally {
      stopScheduling(lessonId);
    }
  };

  const getFormattedDateTime = (dateString) => {
    if (!dateString) return "Date not set";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${formattedDate} at ${formattedTime}`;
    } catch (error) {
      return "Date not available";
    }
  };

  // Filter only booked lessons
  const bookedLessons = lessons.filter(
    (lesson) =>
      lesson?.status === "accepted" ||
      lesson?.status === "scheduled" ||
      lesson?.status === "completed"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-celestialBlue to-africanViolet text-transparent bg-clip-text mb-8 text-center">
        Mentor Dashboard
      </h2>

      {error && (
        <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6 max-w-2xl">
          <p className="text-red-200">{error}</p>
          <button
            onClick={fetchData}
            className="mt-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded text-sm"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-6xl">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-white">Booked Lessons</h3>
          <p className="text-2xl font-bold text-blue-400">{bookedLessons.length}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-white">Total Earnings</h3>
          <p className="text-2xl font-bold text-purple-400">${earnings.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-white">Status</h3>
          <p className="text-xl text-green-300">View & Cancel Only</p>
        </div>
      </div>

      {bookedLessons.length === 0 ? (
        <div className="text-gray-300 text-center mt-10">No booked lessons yet.</div>
      ) : (
        <div className="w-full max-w-6xl">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Booked Lessons</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {bookedLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col w-80 border border-gray-700"
              >
                <h4 className="text-xl font-semibold text-white mb-2">
                  Topic: {lesson.subject || lesson.topic || "No topic specified"}
                </h4>
                <p className="text-gray-300">
                  Student: {lesson.studentId?.firstName || "Unknown"} {lesson.studentId?.lastName || ""}
                </p>
                <p className="text-gray-300">Start: {getFormattedDateTime(lesson.startTime)}</p>
                <p className="text-gray-300">End: {getFormattedDateTime(lesson.endTime)}</p>
                <p className="text-gray-300">Price: ${lesson.price || 0}</p>
                <p className="text-gray-300 mb-4">
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      lesson.status === "accepted"
                        ? "text-green-400"
                        : lesson.status === "scheduled"
                        ? "text-blue-400"
                        : "text-purple-400"
                    }`}
                  >
                    {lesson.status || "Unknown"}
                  </span>
                </p>

                {["accepted", "scheduled", "completed"].includes(lesson.status) && (
                  <button
                    onClick={() => cancelLesson(lesson._id)}
                    disabled={isScheduling(lesson._id)}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white py-2 mt-2 rounded transition-colors"
                  >
                    Cancel Lesson
                  </button>
                )}

                {lesson.meetingLink && (
                  <a
                    href={lesson.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline mt-auto transition-colors"
                  >
                    Join Zoom Meeting
                  </a>
                )}

                {lesson.status === "completed" && lesson.recordingUrl && (
                  <a
                    href={lesson.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 underline mt-2 transition-colors"
                  >
                    View Recording
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
