import React from "react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-indigo-600">Hotel Admin</h1>
        </div>
        <nav className="p-4 space-y-2">
          {["Dashboard", "Bookings", "Rooms", "Customers", "Reports", "Settings"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="block px-4 py-2 rounded hover:bg-indigo-100 text-gray-700 font-medium"
              >
                {item}
              </a>
            )
          )}
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <p className="text-sm font-semibold">Admin</p>
          <p className="text-xs text-gray-500">admin@hotel.com</p>
          <button className="mt-2 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <StatCard title="Total Bookings" value="1,234" change="+5.2%" />
          <StatCard title="Today's Check-ins" value="56" change="+3.4%" />
          <StatCard title="Today's Check-outs" value="34" change="-2.5%" />
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-semibold text-gray-500">Occupancy Rate</h3>
            <p className="text-2xl font-bold text-gray-800">75%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "75%" }}></div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
          <table className="w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                {["Booking ID", "Customer Name", "Check-in", "Check-out", "Room Type", "Status"].map(
                  (col) => (
                    <th key={col} className="px-4 py-2 border-b font-medium text-gray-600">
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[
                ["BK#1024", "John Doe", "2024-01-01", "2024-01-05", "Deluxe Room", "Confirmed"],
                ["BK#1025", "Jane Smith", "2024-01-02", "2024-01-06", "Standard Room", "Pending"],
                ["BK#1026", "Robert Brown", "2024-01-03", "2024-01-07", "Suite", "Checked-in"],
                ["BK#1027", "Michael Williams", "2024-01-04", "2024-01-08", "Deluxe Room", "Cancelled"],
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {row.map((cell, i) => (
                    <td key={i} className="px-4 py-2 border-b">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Room Status */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Current Room Status</h2>
          <div className="grid grid-cols-4 gap-6 text-center">
            <RoomStatus label="Total Rooms" value="120" color="text-gray-800" />
            <RoomStatus label="Available" value="34" color="text-green-600" />
            <RoomStatus label="Occupied" value="78" color="text-indigo-600" />
            <RoomStatus label="Maintenance" value="8" color="text-red-600" />
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable Components
const StatCard = ({ title, value, change }) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p
      className={`text-sm font-medium ${
        change.startsWith("-") ? "text-red-500" : "text-green-500"
      }`}
    >
      {change}
    </p>
  </div>
);

const RoomStatus = ({ label, value, color }) => (
  <div>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export default Dashboard;
