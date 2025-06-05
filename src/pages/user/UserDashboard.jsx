import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import ScheduledLessonCard from "../../components/ScheduledLessonCard";
import MentorCard from "../../components/MentorCard";
import BookLessonModal from "../../components/BookLessonModal";
import lessonServices from "../../services/lessonService";


const UserDashboard = () => {
  const { lessons: initialLessons, mentors } = useLoaderData();
  
  

  const publishableKey = import.meta.env.VITE_PUBLISHABLE_KEY;

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [lessons, setLessons] = useState(initialLessons);


  const handleDelete = (deletedId) => {
    setLessons((prevLessons) =>
      prevLessons.filter((lesson) => lesson._id !== deletedId)
    );
  };

  const fetchLessons = async () => {
    try {
      const response = await lessonServices.getStudentLessons();
      setLessons(response.data);
    } catch (error) {
      console.error("Failed to fetch lessons:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black py-20 px-4">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-celestialBlue to-africanViolet text-transparent bg-clip-text mb-6 text-center">
        Your Scheduled Classes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {lessons.length === 0 ? (
          <p className="text-gray-600 text-center col-span-full">
            No classes scheduled yet.
          </p>
        ) : (
          lessons.map((lesson) => (
            <div key={lesson._id}>
              <ScheduledLessonCard
                key={lesson._id}
                lesson={lesson}
                handleDelete={handleDelete}
               
              />
              <div>
               
              </div>
            </div>
          ))
        )}
      </div>

      <h2 className="text-3xl font-bold bg-gradient-to-r from-celestialBlue to-africanViolet text-transparent bg-clip-text mb-6 text-center">
        Find a Mentor
      </h2>

      {mentors &&
      Array.isArray(mentors.mentors) &&
      mentors.mentors.length > 0 ? (
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
        <p className="text-gray-600 text-center">
          No mentors available at the moment.
        </p>
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
