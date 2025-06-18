// components/StatsCard.jsx
import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-xl shadow-md">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;
