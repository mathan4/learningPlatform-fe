import React from "react";
import { Trash2 } from "lucide-react";
import courseService from "../services/courseService";
import { toast } from "react-toastify";

const AdminCourseTable = ({ courses = [] }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await courseService.deleteCourse(id);
      toast.success("Course deleted successfully");
      window.location.reload(); // You can replace this with state update for better UX
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete course");
    }
  };

  const isValidArray = Array.isArray(courses);

  return (
    <div className="overflow-x-auto mt-4 shadow rounded-lg border border-gray-200">
      <table className="min-w-full table-auto text-left bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3">Title</th>
            <th className="p-3">Mentor</th>
            <th className="p-3">Level</th>
            <th className="p-3">Subject</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {isValidArray && courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{course.title}</td>
                <td className="p-3">{course.mentorId?.firstName || "N/A"}</td>
                <td className="p-3">{course.level}</td>
                <td className="p-3">{course.subject}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                {isValidArray ? "No courses available." : "Invalid course data."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCourseTable;
