import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import courseService from '../../services/courseService';
import lessonServices from '../../services/lessonService';

const ViewClasses = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [upcomingLessons, setUpcomingLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await courseService.getCourseById(courseId);
        const completedData = await lessonServices.getCompletedLessonsByCourse(courseId);
        const upcomingData = await lessonServices.getUpcomingLessonsByCourse(courseId);

        setCourse(courseData);
        setCompletedLessons(completedData.data);
        setUpcomingLessons(upcomingData.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load course or lessons.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId]);

  if (loading) return <div className="p-8 text-center">Loading classes...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">
        {course?.title} – Classes
      </h1>

      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Upcoming Classes</h2>
      {upcomingLessons.length ? (
        <div className="space-y-6 mb-8">
          {upcomingLessons.map((lesson, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded shadow-sm">
              <h3 className="text-lg font-semibold">{lesson.title}</h3>
              <p className="text-gray-600 mb-2">{lesson.description}</p>
              <p className="text-sm text-gray-400 mb-2">Starts at: {new Date(lesson.startTime).toLocaleString()}</p>
              {lesson.meetingLink ? (
                <a
                  href={lesson.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Join Zoom
                </a>
              ) : (
                <p className="text-sm text-yellow-400">Meeting link not yet available</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm mb-8">No upcoming classes.</p>
      )}

      <h2 className="text-2xl font-semibold text-green-500 mb-4">Completed Recordings</h2>
      {completedLessons.length ? (
        <div className="space-y-6">
          {completedLessons.map((lesson, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded shadow-sm">
              <h3 className="text-lg font-semibold">{lesson.title}</h3>
              <p className="text-gray-600 mb-2">{lesson.description}</p>
              {lesson.recordingUrl ? (
                <a
                  href={lesson.recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
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
        <p className="text-gray-500 text-sm">No recorded classes available.</p>
      )}
    </div>
  );
};

export default ViewClasses;
