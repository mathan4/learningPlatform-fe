import React, { useState } from "react";
import BookCourseModal from "./BookCourseModal";

const CourseCard = ({ course }) => {
  const [showModal, setShowModal] = useState(false);

  const enrolledCount = course.enrolledStudents?.length || 0;
  const maxStudents = course.enrollmentSettings?.maxStudents || 0;
  const availableSeats = maxStudents - enrolledCount;

  const startDate = course.timeline?.startDate
    ? new Date(course.timeline.startDate).toLocaleDateString()
    : "TBD";

  const mentorName = `${course.mentorId?.firstName || ""} ${
    course.mentorId?.lastName || ""
  }`.trim();

  return (
    <div className="bg-white/10 border border-africanViolet rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-200">
      {/* Cover Image */}
      {course.media?.coverImage && (
        <img
          src={course.media.coverImage}
          alt={course.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      )}

      {/* Title */}
      <h3 className="text-xl bg-gradient-to-b from-white to-gray-300 text-transparent bg-clip-text font-bold text-indigoCustom mb-2">
        {course.title}
      </h3>

      {/* Mentor & Level */}
      <div className="text-sm text-white/75 mb-2">
        <span className="font-semibold text-africanViolet">Mentor:</span>{" "}
        {mentorName || "N/A"}
      </div>
      <div className="text-sm text-white/75 mb-2">
        <span className="font-semibold text-africanViolet">Level:</span>{" "}
        {course.level || "N/A"}
      </div>

      {/* Duration & Schedule */}
      <div className="text-sm text-white/75 mb-2">
        <span className="font-semibold text-africanViolet">Duration:</span>{" "}
        {course.duration?.weeks || "?"} weeks, {course.duration?.totalHours || "?"} hrs
      </div>
      <div className="text-sm text-white/75 mb-2">
        <span className="font-semibold text-africanViolet">Start Date:</span>{" "}
        {startDate}
      </div>

      {/* Tags */}
      {course.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs mb-3">
          {course.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-celestialBlue/20 text-celestialBlue px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Price & Seats */}
      <div className="text-sm text-white/75 mb-2">
        <span className="font-semibold text-africanViolet">Price:</span>{" "}
        ${course.pricing?.totalPrice || "Free"}
      </div>
      <div
        className={`text-sm font-medium mb-4 ${
          availableSeats <= 0 ? "text-red-400" : "text-green-400"
        }`}
      >
        {availableSeats <= 0
          ? "Course Full"
          : `Available Seats: ${availableSeats}`}
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowModal(true)}
          disabled={availableSeats <= 0}
          className={`${
            availableSeats <= 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-celestialBlue hover:bg-africanViolet"
          } text-white font-medium px-4 py-2 rounded-lg transition flex-1`}
        >
          {availableSeats <= 0 ? "Full" : "Pay & Enroll"}
        </button>
        {/* You can add a "Details" button here if needed */}
      </div>

      {/* Modal */}
      {showModal && (
        <BookCourseModal course={course} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CourseCard;
