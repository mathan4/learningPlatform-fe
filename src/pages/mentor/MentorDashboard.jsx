import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import lessonServices from "../../services/lessonService";
import mentorServices from "../../services/mentorServices";
import CourseCreationForm from "../../components/CourseCreationForm";
import Modal from "../../components/Modal";

const MentorDashboard = () => {
  const {
    allLessons = [],
    totalEarnings = 0,
    upcomingLessonsToday = [],
    mentorCourses = [],
    stats = {},
    error,
  } = useLoaderData();

  const [lessons, setLessons] = useState(allLessons);
  const [earnings, setEarnings] = useState(totalEarnings);
  const [schedulingSet, setSchedulingSet] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboardError, setDashboardError] = useState(error || null);

  const fetchData = async () => {
    try {
      const lessonsRes = await lessonServices.getMentorLessons();
      setLessons(Array.isArray(lessonsRes?.data) ? lessonsRes.data : []);
      const earningsRes = await mentorServices.getMentorEarnings();
      setEarnings(earningsRes?.earnings || 0);
    } catch (err) {
      setDashboardError("Failed to refresh data.");
    }
  };

  const cancelLesson = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this lesson?")) return;
    setSchedulingSet(new Set(schedulingSet).add(id));
    try {
      await lessonServices.cancelLesson(id);
      await fetchData();
    } catch {
      alert("Error canceling lesson");
    } finally {
      const updatedSet = new Set(schedulingSet);
      updatedSet.delete(id);
      setSchedulingSet(updatedSet);
    }
  };

  const getFormattedDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const bookedLessons = lessons.filter((l) =>
    ["accepted", "scheduled", "completed"].includes(l.status)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-celestialBlue to-africanViolet text-transparent bg-clip-text mb-6">
        Mentor Dashboard
      </h1>

      {dashboardError && (
        <div className="bg-red-900 p-4 mb-4 rounded">
          <p>{dashboardError}</p>
          <button
            onClick={fetchData}
            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Booked Lessons" value={bookedLessons.length} color="blue-400" />
        <StatCard title="Earnings" value={`$${earnings.toFixed(2)}`} color="purple-400" />
        <StatCard title="Upcoming Today" value={upcomingLessonsToday.length} color="green-400" />
        <StatCard
          title="Total Students"
          value={stats.totalStudents || 0}
          color="yellow-400"
        />
        <StatCard
          title="Created Courses"
          value={mentorCourses.length}
          color="indigo-400"
        />
      </div>

      {/* Booked Lessons */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Booked Lessons</h2>
        {bookedLessons.length === 0 ? (
          <p className="text-gray-300">No booked lessons.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookedLessons.map((lesson) => (
              <div key={lesson._id} className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-1">
                  {lesson.title || "Untitled Lesson"}
                </h3>
                <p>Subject: {lesson.subject}</p>
                <p>Start: {getFormattedDateTime(lesson.startTime)}</p>
                <p>End: {getFormattedDateTime(lesson.endTime)}</p>
                <p>Price: ${lesson.price || 0}</p>
                <p>Status: <span className="text-green-400">{lesson.status}</span></p>

                {lesson.meetingLink && (
                  <a
                    href={lesson.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline mt-2 block"
                  >
                    Join Zoom
                  </a>
                )}

                {lesson.recordingUrl && (
                  <a
                    href={lesson.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 underline block"
                  >
                    View Recording
                  </a>
                )}

                <button
                  onClick={() => cancelLesson(lesson._id)}
                  disabled={schedulingSet.has(lesson._id)}
                  className="mt-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                >
                  Cancel Lesson
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Created Courses */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Courses</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-celestialBlue text-white px-4 py-2 rounded-lg"
          >
            + Create New Course
          </button>
        </div>

        {mentorCourses.length === 0 ? (
          <p className="text-gray-400">No courses created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentorCourses.map((course) => (
              <div key={course._id} className="bg-white/10 p-4 rounded-xl shadow border border-white/10">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm">{course.description}</p>
                <p className="text-xs text-gray-400">Subject: {course.subject}</p>
                <p className="text-xs text-gray-400 mb-1">Level: {course.level}</p>
                <Link
                  to={`/dashboard/mentor/courses/${course._id}/lessons`}
                  className="text-blue-400 underline"
                >
                  View Lessons
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CourseCreationForm onSuccess={() => {
            setIsModalOpen(false);
            fetchData();
          }} />
        </Modal>
      )}
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`bg-gray-800 p-4 rounded-lg text-center shadow`}>
    <h3 className="text-sm font-medium text-white">{title}</h3>
    <p className={`text-2xl font-bold text-${color}`}>{value}</p>
  </div>
);

export default MentorDashboard;
