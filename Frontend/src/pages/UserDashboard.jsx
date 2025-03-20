import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileView from '../components/ProfileView';
import DashboardTab from '../components/DashboardTab';
import IdentifyDiseaseTab from '../components/IdentifyDiseaseTab';
import MedicinesTab from '../components/MedicinesTab';
import AISuggestionsTab from '../components/AISuggestionsTab';
import axios from 'axios';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData || !userData.token) {
        throw new Error('No user data found');
      }

      const response = await axios.get('http://localhost:5557/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${userData.token}`
        }
      });

      setUserProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to load user profile');
      setLoading(false);
    }
  };

  const tabs = ['Dashboard', 'Identify Disease', 'Medicines', 'AI Suggestions'];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-white text-green-800 p-14">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">User Dashboard</h1>
        {userProfile && <ProfileView user={userProfile} />}
      </div>

      <div className="mb-8">
        <div className="flex space-x-4 bg-green-100 p-2 rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab === tab ? 'bg-green-700 text-white' : 'hover:bg-green-200'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'Dashboard' && <DashboardTab />}
          {activeTab === 'Identify Disease' && <IdentifyDiseaseTab />}
          {activeTab === 'Medicines' && <MedicinesTab />}
          {activeTab === 'AI Suggestions' && <AISuggestionsTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default UserDashboard;