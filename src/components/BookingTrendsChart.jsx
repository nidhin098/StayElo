import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  CartesianGrid,
  ReferenceDot,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { format, subDays } from "date-fns";

const BookingTrendsChart = () => {
  const [range, setRange] = useState("1M");
  const [data, setData] = useState([]);

  // 📊 Generate fake data based on range
  const generateData = (days) => {
    const now = new Date();
    return Array.from({ length: days }, (_, i) => {
      const d = subDays(now, days - i);
      return {
        label: format(d, "MMM d"),
        bookings: Math.floor(200 + Math.sin(i / 5) * 50 + Math.random() * 20),
      };
    });
  };

  useEffect(() => {
    const rangeMap = {
      "1W": 7,
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "1Y": 365,
      ALL: 730,
    };
    const newData = generateData(rangeMap[range]);
    setData(newData);
  }, [range]);

  const latestValue = data.length ? data[data.length - 1].bookings : null;

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 shadow-sm rounded-2xl p-5"
      variants={chartVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Header + Range Selector */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Booking Trends
        </h3>

        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {["1W", "1M", "3M", "6M", "1Y", "ALL"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                range === r
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Line Chart */}
      <AnimatePresence mode="wait">
        <motion.div
          key={range}
          variants={chartVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              {/* Gradient for area fill */}
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />

              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                domain={["dataMin - 20", "dataMax + 20"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                labelStyle={{
                  fontWeight: "600",
                  color: "#374151",
                }}
              />

              {/* Area under line */}
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="none"
                fill="url(#colorBookings)"
              />

              {/* Animated Line */}
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={true}
                animationDuration={600}
              />

              {/* Current Value Marker */}
              {latestValue && (
                <ReferenceDot
                  x={data[data.length - 1].label}
                  y={latestValue}
                  r={4}
                  fill="#3b82f6"
                  stroke="white"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>

      <p className="text-sm text-gray-500 mt-2 text-center">
        Data for the selected period: <span className="font-medium">{range}</span>
      </p>
    </motion.div>
  );
};

export default BookingTrendsChart;
