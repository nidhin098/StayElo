import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

const BookingChannelsChart = ({ range, startDate, endDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let newData = [];

      // Generate data dynamically based on selected range
      if (range === "custom" && startDate && endDate) {
        const diffDays = Math.ceil(
          (endDate - startDate) / (1000 * 60 * 60 * 24)
        );

        newData = [
          { name: "Direct", value: 40 + (diffDays % 10) },
          { name: "Online Travel Agencies", value: 30 - (diffDays % 5) },
          { name: "Corporate", value: 15 + (diffDays % 3) },
          { name: "Walk-in", value: 15 },
        ];
      } else if (range === "7days") {
        newData = [
          { name: "Direct", value: 48 },
          { name: "Online Travel Agencies", value: 30 },
          { name: "Corporate", value: 12 },
          { name: "Walk-in", value: 10 },
        ];
      } else if (range === "30days") {
        newData = [
          { name: "Direct", value: 45 },
          { name: "Online Travel Agencies", value: 35 },
          { name: "Corporate", value: 10 },
          { name: "Walk-in", value: 10 },
        ];
      } else {
        newData = [
          { name: "Direct", value: 50 },
          { name: "Online Travel Agencies", value: 25 },
          { name: "Corporate", value: 15 },
          { name: "Walk-in", value: 10 },
        ];
      }

      await new Promise((resolve) => setTimeout(resolve, 400));
      setData(newData);
    };

    fetchData();
  }, [range, startDate, endDate]);

  // Define chart colors and gradients
  const COLORS = ["#3b82f6", "#60a5fa", "#facc15", "#10b981"];

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  // Total bookings (for percentage labels)
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 shadow-sm rounded-2xl p-5"
      variants={chartVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key={
        range + (startDate?.toString() || "") + (endDate?.toString() || "")
      }
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Booking Channels
        </h3>
        <span className="text-xs text-gray-500">Live update</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={
            range + (startDate?.toString() || "") + (endDate?.toString() || "")
          }
          variants={chartVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.4} />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#facc15" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#fde047" stopOpacity={0.5} />
                  </linearGradient>
                  <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#6ee7b7" stopOpacity={0.4} />
                  </linearGradient>
                </defs>

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={50}
                  paddingAngle={4}
                  animationDuration={800}
                  isAnimationActive={true}
                  labelLine={false}
                  label={({ name, value }) =>
                    `${name} ${(value / total * 100).toFixed(1)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#grad${(index % 3) + 1})`}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => `${value}%`}
                />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "13px",
                    color: "#6b7280",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </AnimatePresence>

      {range === "custom" && startDate && endDate && (
        <p className="text-sm text-gray-500 mt-3 text-center">
          Showing data from {format(startDate, "MMM d, yyyy")} to{" "}
          {format(endDate, "MMM d, yyyy")}
        </p>
      )}
    </motion.div>
  );
};

export default BookingChannelsChart;
