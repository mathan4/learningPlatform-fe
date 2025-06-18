import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import courseService from '../services/courseService';

const ViewClasses = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await courseService.getCourseById(courseId);
        setCourse(courseData);
      } catch (err) {
        console.error(err);
        setError('Failed to load course content.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div className="p-8 text-center">Loading classes...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">
        {course?.title} – Class Recordings
      </h1>

      {course?.classes?.length ? (
        <div className="space-y-6">
          {course.classes.map((lesson, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded shadow-sm">
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
              <p className="text-gray-600 mb-2">{lesson.description}</p>
              {lesson.recordingUrl ? (
                <a
                  href={lesson.recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Watch Recording
                </a>
              ) : (
                <p className="text-sm text-gray-400">Recording not available</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No classes available for this course yet.</p>
      )}
    </div>
  );
};

export default ViewClasses;
