import { toast } from "react-toastify";
import lessonServices from "../services/lessonService";

const ScheduledLessonCard = ({ lesson, handleDelete }) => {
  const { subject, startTime, mentorId, status, _id } = lesson;
   
  const handleCancel = async() => {
    try {
    await lessonServices.cancelLesson(_id);
    toast.success("Lesson cancelled!");
    handleDelete(_id); 
  } catch (err) {
    toast.error("Failed to cancel lesson.");
    console.error(err);
  }
  }

  return (
    <div className="p-4 shadow-md rounded-lg flex flex-col sm:flex-row bg-gradient-to-b from-white to bg-gray-300 justify-between items-start sm:items-center">
      <div>
        <h3 className="text-lg font-semibold text-indigoCustom">{subject}</h3>
        <p className="text-gray-600">Mentor: {mentorId?.firstName}</p>
        <p className="text-gray-600">
          {new Date(startTime).toLocaleDateString()} at{" "}
          {new Date(startTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        {status && (
          <p className="text-sm text-gray-500 mt-1">Status: {status}</p>
        )}
      </div>

      <div className="mt-3 sm:mt-0">
        <button className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ScheduledLessonCard;
