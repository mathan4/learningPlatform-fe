import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import courseService from '../services/courseService';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const [courseDetails, enrolledCourseIds] = await Promise.all([
          courseService.getCourseById(courseId),
          courseService.getEnrolledCourseIds(),
        ]);

        setCourse(courseDetails);
        setIsEnrolled(enrolledCourseIds.includes(courseId));
      } catch (error) {
        setMessage("Failed to load course data.");
        console.error(error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      setLoading(true);
      const response = await courseService.enrollInCourse(courseId);
      setMessage(response.message || "Enrollment successful.");
      setIsEnrolled(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Enrollment failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return <div className="p-8 text-center text-lg">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold text-purple-700 mb-2">{course.title}</h1>
      <p className="text-gray-700 mb-4">{course.description}</p>

      <div className="space-y-2 text-gray-600">
        <p><strong>Subject:</strong> {course.subject}</p>
        <p><strong>Level:</strong> {course.level}</p>
        <p><strong>Time Slot:</strong> {course.timeSlot}</p>
      </div>

      <div className="mt-6 flex gap-4 flex-wrap">
        {isEnrolled ? (
          <>
            <span className="inline-block bg-green-100 text-green-800 font-semibold px-4 py-2 rounded">
              Enrolled
            </span>
            <Link
              to={`/courses/${courseId}/classes`}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
            >
              View Classes
            </Link>
          </>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={loading}
            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Enrolling...' : 'Enroll'}
          </button>
        )}
      </div>

      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </div>
  );
};

export default CourseDetail;
