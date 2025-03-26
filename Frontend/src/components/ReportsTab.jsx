import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { FaBug, FaClipboardCheck, FaHourglassHalf } from "react-icons/fa";
import "chart.js/auto";

const ReportsTab = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const token = userData?.token;

        if (!token) return;

        const response = await axios.get("http://localhost:5557/manager/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  if (!stats)
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 text-lg">
        Loading reports...
      </div>
    );

  const chartData = {
    labels: stats.commonDiseases.map((d) => d._id),
    datasets: [
      {
        label: "Most Reported Diseases",
        data: stats.commonDiseases.map((d) => d.count),
        backgroundColor: ["#10b981", "#3b82f6", "#facc15", "#f97316", "#8b5cf6"],
        borderRadius: 10,
        barThickness: 50,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Reports Dashboard</h1>
        <p className="text-gray-500">Insight into reported crop issues and their resolution status.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-6 rounded-xl shadow-lg flex items-center">
          <div className="p-4 bg-blue-100 rounded-full mr-4">
            <FaBug className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Reports</h3>
            <p className="text-2xl font-bold text-blue-700">{stats.totalReports}</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-6 rounded-xl shadow-lg flex items-center">
          <div className="p-4 bg-yellow-100 rounded-full mr-4">
            <FaHourglassHalf className="text-yellow-600 text-xl" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Pending Reports</h3>
            <p className="text-2xl font-bold text-yellow-700">{stats.pendingReports}</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-6 rounded-xl shadow-lg flex items-center">
          <div className="p-4 bg-green-100 rounded-full mr-4">
            <FaClipboardCheck className="text-green-600 text-xl" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Resolved Reports</h3>
            <p className="text-2xl font-bold text-green-700">{stats.resolvedReports}</p>
          </div>
        </motion.div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Most Common Diseases</h3>
            <span className="text-sm text-green-600">View All</span>
          </div>
          <div style={{ height: "300px" }}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: { ticks: { beginAtZero: true, font: { size: 12 } } },
                  x: { ticks: { font: { size: 12 } } },
                },
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-center items-center"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📈 Future Chart</h3>
          <p className="text-gray-500 text-center">Insights coming soon...</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportsTab;
