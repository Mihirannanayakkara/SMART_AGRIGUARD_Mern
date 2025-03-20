import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCalendar, FaMapMarkerAlt, FaPhone, FaLeaf, FaPencilAlt, FaCamera, FaChartLine, FaMedal, FaSeedling } from 'react-icons/fa';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!userProfile) return <ErrorMessage message="No user data found" />;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3 p-8 flex flex-col items-center justify-center relative">
              <div className="h-48 w-48 rounded-full bg-white flex items-center justify-center overflow-hidden mb-4 relative group">
                {userProfile.profilePic ? (
                  <img src={userProfile.profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl font-bold text-green-600">{userProfile.username.charAt(0).toUpperCase()}</span>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaCamera className="text-white text-3xl" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{userProfile.username}</h2>
              <p className="text-green-200 text-lg mb-4">{userProfile.role || 'User'}</p>
              <div className="flex space-x-4">
                <Stat icon={<FaChartLine />} value="250" label="Points" />
                <Stat icon={<FaMedal />} value="5" label="Badges" />
                <Stat icon={<FaSeedling />} value="12" label="Plants" />
              </div>
            </div>
            <div className="p-8 md:w-2/3 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">Profile Information</h3>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center"
                >
                  <FaPencilAlt className="mr-2" />
                  {isEditing ? 'Save' : 'Edit Profile'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileField icon={<FaUser />} label="Full Name" value={userProfile.fullName} isEditing={isEditing} />
                <ProfileField icon={<FaEnvelope />} label="Email" value={userProfile.email} isEditing={isEditing} />
                <ProfileField icon={<FaCalendar />} label="Joined" value={new Date(userProfile.createdAt).toLocaleDateString()} isEditing={false} />
                <ProfileField icon={<FaMapMarkerAlt />} label="Location" value={userProfile.location || 'Not specified'} isEditing={isEditing} />
                <ProfileField icon={<FaPhone />} label="Phone" value={userProfile.phoneNumber || 'Not specified'} isEditing={isEditing} />
                <ProfileField icon={<FaLeaf />} label="Role" value={userProfile.role || 'User'} isEditing={false} />
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <ActivityFeed />
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h3>
            <AchievementsList />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Stat = ({ icon, value, label }) => (
  <div className="text-center">
    <div className="text-white text-2xl mb-1">{icon}</div>
    <div className="text-white font-bold">{value}</div>
    <div className="text-green-200 text-sm">{label}</div>
  </div>
);

const ProfileField = ({ icon, label, value, isEditing }) => (
  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
    <div className="text-green-600 mr-3">{icon}</div>
    <div className="flex-grow">
      <div className="text-sm text-gray-600">{label}</div>
      {isEditing ? (
        <input 
          type="text" 
          value={value} 
          className="font-medium mt-1 p-1 border rounded w-full"
          onChange={(e) => console.log(e.target.value)} // Add state management for editing
        />
      ) : (
        <div className="font-medium">{value}</div>
      )}
    </div>
  </div>
);

const ActivityFeed = () => (
  <div className="space-y-4">
    <ActivityItem 
      icon={<FaSeedling className="text-green-500" />}
      action="planted a new seed"
      time="2 hours ago"
    />
    <ActivityItem 
      icon={<FaChartLine className="text-blue-500" />}
      action="earned 50 points"
      time="1 day ago"
    />
    <ActivityItem 
      icon={<FaMedal className="text-yellow-500" />}
      action="achieved 'Green Thumb' badge"
      time="3 days ago"
    />
  </div>
);

const ActivityItem = ({ icon, action, time }) => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0">{icon}</div>
    <div className="flex-grow">
      <p className="text-sm font-medium text-gray-900">{action}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

const AchievementsList = () => (
  <div className="grid grid-cols-2 gap-4">
    <AchievementItem 
      icon={<FaSeedling className="text-green-500" />}
      title="First Plant"
      description="Successfully grew your first plant"
    />
    <AchievementItem 
      icon={<FaChartLine className="text-blue-500" />}
      title="Point Collector"
      description="Earned 1000 points"
    />
    <AchievementItem 
      icon={<FaMedal className="text-yellow-500" />}
      title="Green Thumb"
      description="Grew 10 different plant species"
    />
    <AchievementItem 
      icon={<FaLeaf className="text-green-700" />}
      title="Eco Warrior"
      description="Participated in 5 eco-friendly events"
    />
  </div>
);

const AchievementItem = ({ icon, title, description }) => (
  <div className="bg-gray-50 p-3 rounded-lg flex items-start space-x-3">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h4 className="text-sm font-medium text-gray-900">{title}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center h-screen">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  </div>
);

export default ProfilePage;