const MentorCard = ({ mentor, onBookClick }) => {

  return (
    <div className="bg-white/10 border border-africanViolet rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-200">
      <h3 className="text-xl bg-gradient-to-b from-white to bg-gray-300 text-transparent bg-clip-text font-bold text-indigoCustom mb-2">
        {mentor.userId.firstName} {mentor.userId.lastName}
      </h3>

      <p className="text-sm text-white/75 mb-2">
        <span className="font-semibold text-africanViolet">Subjects:</span>{" "}
        {mentor.subjects.join(", ")}
      </p>

      <div className="text-sm text-white/75 mb-2">
        <span className="font-semibold text-africanViolet">Price:</span>{" "}
        ₹{mentor.hourlyRate} / session
      </div>

      <div className="text-sm text-white/75 mb-4">
        <span className="font-semibold text-africanViolet">Availability:</span>
        <ul className="list-disc list-inside mt-1 space-y-1">
          {mentor.availability.map((slot, idx) => (
            <li key={idx}>
              {slot.day}: {slot.startTime} - {slot.endTime}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onBookClick}
        className="bg-celestialBlue hover:bg-africanViolet text-white font-medium px-4 py-2 rounded-lg transition"
      >
        Book Class
      </button>
    </div>
  );
};

export default MentorCard;
