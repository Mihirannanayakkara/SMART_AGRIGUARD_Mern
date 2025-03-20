import React from 'react';
import { motion } from 'framer-motion';
import { FaThermometerHalf, FaTint, FaSun } from 'react-icons/fa';
import { RiPlantLine } from 'react-icons/ri';

const DashboardTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <FaThermometerHalf className="text-3xl text-red-500 mb-2" />
          <h3 className="font-semibold">Temperature</h3>
          <p>25°C</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <FaTint className="text-3xl text-blue-500 mb-2" />
          <h3 className="font-semibold">Humidity</h3>
          <p>60%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <FaSun className="text-3xl text-yellow-500 mb-2" />
          <h3 className="font-semibold">Sunlight</h3>
          <p>Moderate</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <RiPlantLine className="text-3xl text-green-500 mb-2" />
          <h3 className="font-semibold">Soil Moisture</h3>
          <p>Optimal</p>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardTab;