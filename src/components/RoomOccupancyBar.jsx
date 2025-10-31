import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";

const rooms = [
  { type: "Standard", rate: 95 },
  { type: "Deluxe", rate: 82 },
  { type: "Suite", rate: 75 },
  { type: "Penthouse", rate: 60 },
];

const RoomOccupancyBar = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`p-5 rounded-2xl shadow-xl transition-all duration-500 ${
        darkMode
          ? "bg-gray-900/90 border border-gray-700 text-gray-100"
          : "bg-white border border-gray-200 text-gray-800"
      }`}
    >
      {/* Header with toggle */}
      <div className="flex justify-between items-center mb-3">
        <h3
          className={`font-semibold text-lg ${
            darkMode ? "text-indigo-400" : "text-indigo-600"
          }`}
        >
          Occupancy by Room Type
        </h3>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full border border-gray-500 hover:scale-110 transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Bars */}
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room.type}>
            <div className="flex justify-between text-sm mb-1">
              <span
                className={`font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {room.type}
              </span>
              <span
                className={`font-semibold ${
                  darkMode ? "text-indigo-300" : "text-indigo-600"
                }`}
              >
                {room.rate}%
              </span>
            </div>
            <div
              className={`w-full h-2 rounded-full transition-all duration-500 ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  darkMode ? "bg-indigo-500" : "bg-indigo-400"
                }`}
                style={{ width: `${room.rate}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomOccupancyBar;
