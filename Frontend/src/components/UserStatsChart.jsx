import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const UserStatsChart = ({ data }) => {
  const chartRef = useRef(null);
  
  // Sample data if no data is provided
  const chartData = data || {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [12, 19, 15, 25, 22, 30]
  };
  
  // Find the maximum value for scaling
  const maxValue = Math.max(...chartData.values);
  
  useEffect(() => {
    // You could integrate a real chart library here like Chart.js
    // This is a simple custom chart implementation
  }, [data]);
  
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">User Registration Trends</h3>
      
      <div className="relative h-64" ref={chartRef}>
        <div className="flex h-full items-end">
          {chartData.values.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <motion.div 
                className="w-8 bg-green-600 rounded-t-md"
                style={{ 
                  height: `${(value / maxValue) * 100}%`,
                  backgroundColor: index % 2 === 0 ? '#059669' : '#10B981' 
                }}
                initial={{ height: 0 }}
                animate={{ height: `${(value / maxValue) * 100}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
              <div className="text-xs text-gray-600 mt-2">{chartData.labels[index]}</div>
            </div>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>{maxValue}</span>
          <span>{Math.round(maxValue / 2)}</span>
          <span>0</span>
        </div>
      </div>
    </motion.div>
  );
};

export default UserStatsChart;