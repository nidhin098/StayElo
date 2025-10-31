import React from "react";
import { FaChartBar, FaCog, FaHome, FaBed, FaUsers } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen shadow-md flex flex-col p-5">
      <h1 className="text-xl font-bold mb-8 text-gray-700">Grand Hotel</h1>
      <ul className="space-y-4 text-gray-600 font-medium">
        <li className="flex items-center space-x-3 hover:text-blue-500 cursor-pointer">
          <FaHome /> <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-blue-500 cursor-pointer">
          <FaBed /> <span>Bookings</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-blue-500 cursor-pointer">
          <FaUsers /> <span>Customers</span>
        </li>
        <li className="flex items-center space-x-3 text-blue-500 font-semibold">
          <FaChartBar /> <span>Reports</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-blue-500 cursor-pointer">
          <FaCog /> <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
