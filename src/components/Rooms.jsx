import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";

const Rooms = () => {
  const [darkMode, setDarkMode] = useState(true);

  const rooms = [
    { number: 101, type: "Deluxe", status: "Occupied" },
    { number: 102, type: "Standard", status: "Available" },
    { number: 103, type: "Suite", status: "To be serviced" },
    { number: 104, type: "Executive", status: "Occupied" },
  ];

  const statusColors = (status, darkMode) => {
    const base = {
      Occupied: darkMode
        ? "bg-indigo-500/90 text-white shadow-md shadow-indigo-500/30"
        : "bg-indigo-400 text-white shadow shadow-indigo-300/50",
      Available: darkMode
        ? "bg-green-500/90 text-white shadow-md shadow-green-400/30"
        : "bg-green-400 text-white shadow shadow-green-300/50",
      "To be serviced": darkMode
        ? "bg-red-500/90 text-white shadow-md shadow-red-400/30"
        : "bg-red-400 text-white shadow shadow-red-300/50",
    };
    return base[status];
  };

  return (
    <div
      className={`min-h-screen p-8 font-[Poppins] transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800"
      }`}
    >
      {/* Header + toggle */}
      <div className="flex justify-between items-center mb-10">
        <h1
          className={`text-4xl sm:text-5xl font-extrabold tracking-wide drop-shadow-lg ${
            darkMode ? "text-indigo-400" : "text-indigo-600"
          }`}
        >
          Rooms Overview
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full border border-gray-500 hover:scale-110 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Room cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div
            key={room.number}
            className={`p-6 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 ${
              darkMode
                ? "bg-gray-800/70 backdrop-blur-xl border border-gray-700 hover:shadow-indigo-700/50"
                : "bg-white border border-gray-200 hover:shadow-indigo-300/50"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-3 tracking-wide drop-shadow-sm ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            >
              Room #{room.number}
            </h2>
            <p
              className={`text-sm mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Type: {room.type}
            </p>
            <span
              className={`inline-block text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${statusColors(
                room.status,
                darkMode
              )}`}
            >
              {room.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
