import React from 'react';
import { FaBell, FaUser, FaCog } from 'react-icons/fa';

const TopNav = () => {
  return (
    <nav className="bg-green-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-white text-2xl font-bold">SMART AGRIGUARD</span>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-green-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white">
              <FaBell className="h-6 w-6" />
            </button>
            <button className="ml-4 p-2 rounded-full text-green-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white">
              <FaUser className="h-6 w-6" />
            </button>
            <button className="ml-4 p-2 rounded-full text-green-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white">
              <FaCog className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;