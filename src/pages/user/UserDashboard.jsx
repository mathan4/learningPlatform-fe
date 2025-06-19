import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import ScheduledLessonCard from "../../components/ScheduledLessonCard";
import MentorCard from "../../components/MentorCard";
import BookLessonModal from "../../components/BookLessonModal";
import lessonServices from "../../services/lessonService";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { lessons: initialLessons, mentors, courses } = useLoaderData();

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [lessons, setLessons] = useState(Array.isArray(initialLessons?.data) ? initialLessons.data : []);

  const handleDelete = (deletedId) => {
    setLessons((prevLessons) =>
      prevLessons.filter((lesson) => lesson._id !== deletedId)
    );
  };

  const fetchLessons = async () => {
    try {
      const response = await lessonServices.getStudentLessons();
      setLessons(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch (error) {
      console.error("Failed to fetch lessons:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black py-20 px-4">
      {/* Scheduled Classes */}
      <h2 className="text-3xl font-bold bg-gradient-to-r from-celestialBlue to-africanViolet text-transparent bg-clip-text mb-6 text-center">
        Your Scheduled Classes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {Array.isArray(lessons) && lessons.length > 0 ? (
          lessons.map((lesson) => (
            <ScheduledLessonCard
              key={lesson._id}
              lesson={lesson}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-300 text-center col-span-full">
            No classes scheduled yet.
          </p>
        )}
      </div>

      {/* Enrolled Courses */}
      <h2 className="text-3xl font-bold bg-gradient-to-r from-celestialBlue to-africanViolet text-transparent bg-clip-text mb-6 text-center">
        Your Enrolled Courses
      </h2>

      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course) => (
            <div
              key={course._id}
              className="p-6 bg-white/10 backdrop-blur-sm rounded-xl text-white shadow-lg border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-sm mb-2">{course.description}</p>
              <p className="text-xs text-gray-400">Subject: {course.subject}</p>
              <p className="text-xs text-gray-400">Level: {course.level}</p>
              <Link
                to={`/dashboard/courses/${course._id}/classes`}
                className="inline-block mt-3 text-sm text-blue-400 hover:underline"
              >
                View Classes
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300 text-center mb-12">
          You are not enrolled in any courses yet.
        </p>
      )}

      {/* Browse Mentors */}
      <h2 className="text-3xl font-bold bg-gradient-to-r from-celestialBlue to-africanViolet text-transparent bg-clip-text mb-6 text-center">
        Find a Mentor
      </h2>

      {mentors && Array.isArray(mentors.mentors) && mentors.mentors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.mentors.map((mentor) => (
            <MentorCard
              key={mentor._id}
              mentor={mentor}
              onBookClick={() => setSelectedMentor(mentor)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-300 text-center">No mentors available at the moment.</p>
      )}

      {selectedMentor && (
        <BookLessonModal
          mentor={selectedMentor}
          onClose={() => setSelectedMentor(null)}
          fetchLessons={fetchLessons}
        />
      )}
    </div>
  );
};

export default UserDashboard;
