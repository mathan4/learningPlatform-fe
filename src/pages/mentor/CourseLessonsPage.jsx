import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { authInstance } from "../../services/instance"; // make sure you're using this

const CourseLessonsPage = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await authInstance.get(`/mentors/courses/${courseId}/lessons`);
        setLessons(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching course lessons:", err);
        setError("Failed to load lessons.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  if (loading) return <div className="p-8 text-center text-celestialBlue">Loading lessons...</div>;
  if (error) return <div className="p-8 text-red-600 text-center">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-celestialBlue">Course Lessons</h1>

      {lessons.length === 0 ? (
        <p className="text-blackCustom">No lessons available for this course yet.</p>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="p-4 border border-papayaWhip rounded-lg shadow bg-white/10 text-blackCustom backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold text-indigoCustom">
                {lesson.title || "Untitled Lesson"}
              </h2>
              <p className="text-sm">Subject: {lesson.subject}</p>
              <p className="text-sm">
                Time: {new Date(lesson.startTime).toLocaleString()} →{" "}
                {new Date(lesson.endTime).toLocaleTimeString()}
              </p>

              {lesson.meetingLink && (
                <a
                  href={lesson.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-celestialBlue hover:underline block mt-2"
                >
                  Join Meeting
                </a>
              )}

              {lesson.recordingUrl && (
                <a
                  href={lesson.recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-africanViolet hover:underline block"
                >
                  Watch Recording
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseLessonsPage;
