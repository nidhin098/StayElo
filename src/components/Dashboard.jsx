// src/components/Dashboard.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { RotatingCard, OccupancyBar3D, RoomStatusPieChart } from "./ThreeElements";

const Dashboard = () => {
  const navigate = useNavigate();
  const pieData = { occupied: 78, unoccupied: 34, service: 8 };
  const totalRooms = pieData.occupied + pieData.unoccupied + pieData.service;
  const pct = (n) => Math.round((n / totalRooms) * 100);

  return (
    <div className="flex min-h-screen font-[Poppins] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100">
      {/* Sidebar */}
      <aside className="relative w-64 bg-gray-800/60 backdrop-blur-xl border-r border-gray-700 shadow-2xl flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-extrabold text-indigo-400 tracking-wider drop-shadow-md">
              Hotel Admin
            </h1>
          </div>
          <nav className="p-4 space-y-2">
            {["Dashboard", "Bookings", "Rooms", "Customers", "Reports", "Settings"].map((item) => (
              <button
                key={item}
                onClick={() => item === "Rooms" && navigate("/rooms")}
                className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-between ${
                  item === "Rooms"
                    ? "bg-indigo-600/80 text-white shadow-lg shadow-indigo-700/30 hover:bg-indigo-700"
                    : "text-gray-300 hover:bg-gray-700/60 hover:text-white hover:shadow-sm"
                }`}
              >
                {item}
                <span className="text-xs opacity-60">{item === "Rooms" && "→"}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="w-full p-4 border-t border-gray-700 bg-gray-800/50">
          <p className="text-sm font-semibold">Admin</p>
          <p className="text-xs text-gray-400">admin@hotel.com</p>
          <button className="mt-3 w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-10 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-semibold text-indigo-300 tracking-wide">Dashboard Overview</h2>
          <span className="text-sm text-gray-400">Updated just now</span>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "Total Bookings", value: "1,234", change: "+5.2%", color: "#6366f1" },
            { label: "Today's Check-ins", value: "56", change: "+3.4%", color: "#16a34a" },
            { label: "Today's Check-outs", value: "34", change: "-2.5%", color: "#dc2626" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-gray-800/80 rounded-2xl shadow-2xl backdrop-blur-md border border-gray-700 hover:scale-[1.03] hover:shadow-indigo-700/20 transition-transform duration-300"
            >
              <Canvas camera={{ position: [3.5, 2.5, 3.5] }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[4, 5, 3]} intensity={0.8} />
                <RotatingCard {...stat} />
                <OrbitControls enableZoom={false} />
              </Canvas>
            </div>
          ))}

          <div className="bg-gray-800/80 rounded-2xl shadow-2xl border border-gray-700 hover:scale-[1.03] hover:shadow-indigo-700/20 transition-transform duration-300">
            <Canvas camera={{ position: [4, 3, 4] }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[4, 5, 3]} intensity={0.8} />
              <OccupancyBar3D percent={75} />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        </div>

        {/* Room Status Section */}
        <section className="bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
              Current Room Status
            </h2>
            <span className="text-sm text-gray-300">
              Total rooms: {totalRooms}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 3D Pie */}
            <div className="col-span-2 h-96 rounded-xl overflow-hidden bg-gray-900 border border-gray-700 shadow-inner">
              <Canvas camera={{ position: [0, 4, 6], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={0.9} castShadow />
                <RoomStatusPieChart {...pieData} />
                <OrbitControls />
              </Canvas>
            </div>

            {/* Legend */}
            <div className="bg-gray-900/80 rounded-xl p-6 border border-gray-700 shadow-md space-y-5">
              {[
                { label: "Occupied", color: "bg-indigo-500", value: pieData.occupied },
                { label: "Unoccupied", color: "bg-green-500", value: pieData.unoccupied },
                { label: "To be serviced", color: "bg-red-500", value: pieData.service },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-4 h-4 rounded-full ${item.color} shadow-sm`} />
                    <span className="text-sm text-gray-200">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-100">
                    {item.value} ({pct(item.value)}%)
                  </span>
                </div>
              ))}
              <p className="pt-4 text-xs text-gray-400 border-t border-gray-700">
                Updated 24h ago • You can rotate the 3D chart
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
