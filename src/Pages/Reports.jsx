import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ReportCard from "../components/ReportCard";
import BookingTrendsChart from "../components/BookingTrendsChart";
import RevenueBreakdownChart from "../components/RevenueBreakdownChart";
import RoomOccupancyBar from "../components/RoomOccupancyBar";
import BookingChannelsChart from "../components/BookingChannelsChart";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";



const Reports = () => {
  const [range, setRange] = useState("30days");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const ranges = [
    { label: "Last 7 Days", value: "7days" },
    { label: "Last 30 Days", value: "30days" },
    { label: "This Quarter", value: "quarter" },
    { label: "Custom Range", value: "custom" },
  ];

  const handleRangeSelect = (value) => {
    setRange(value);
    if (value !== "custom") {
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Export
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => handleRangeSelect(r.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                range === r.value
                  ? "bg-blue-100 text-blue-600"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {r.label}
            </button>
          ))}

          {/* Date Pickers (only visible if Custom Range selected) */}
          {range === "custom" && (
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm font-medium">From:</span>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className="border px-3 py-2 rounded-lg text-sm w-36 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm font-medium">To:</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="End Date"
                  className="border px-3 py-2 rounded-lg text-sm w-36 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-5">
          <ReportCard title="Total Revenue" value="$125,830" change="+5.2%" positive />
          <ReportCard title="Avg. Occupancy Rate" value="82%" change="-1.5%" positive={false} />
          <ReportCard title="ADR" value="$152.50" change="+2.1%" positive />
          <ReportCard title="Total Bookings" value="827" change="+8.0%" positive />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-5">
          <BookingTrendsChart
            range={range}
            startDate={startDate}
            endDate={endDate}
          />
          <RevenueBreakdownChart />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <RoomOccupancyBar />
          <BookingChannelsChart
            range={range}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;
