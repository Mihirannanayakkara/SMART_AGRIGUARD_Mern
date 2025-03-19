import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaNewspaper, FaChartPie, FaEye, FaPlus, FaEdit } from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';
import StatsCard from '../components/StatsCard';
import UserStatsChart from '../components/UserStatsChart';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    users: 0,
    articles: 0,
    views: 0,
    engagement: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Replace the mock data with actual user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user'));
  if (!userData || userData.user.role !== 'admin') {
    navigate('/login');
    return;
  }
  
  setUser(userData.user);
  
  // Fetch dashboard stats from API
  const fetchStats = async () => {
    try {
      // API call here
      // For now, we'll keep using the mock data
      setStats({
        users: 256,
        articles: 48,
        views: 12540,
        engagement: 67
      });
      
      // Mock recent activities
      setRecentActivities([
        { id: 1, type: 'user', action: 'New user registered', name: 'John Doe', time: '2 hours ago' },
        { id: 2, type: 'article', action: 'Article published', name: 'Plant Disease Prevention Tips', time: '5 hours ago' },
        { id: 3, type: 'user', action: 'User updated profile', name: 'Sarah Johnson', time: '1 day ago' },
        { id: 4, type: 'article', action: 'Article edited', name: 'Organic Farming Methods', time: '2 days ago' },
        { id: 5, type: 'user', action: 'New user registered', name: 'Michael Brown', time: '3 days ago' }
      ]);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);
    }
  };
  
  fetchStats();
}, [navigate]);
    
  // Sample chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [42, 58, 65, 89, 112, 256]
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar user={user} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600 mb-8">Welcome, {user?.fullName || user?.username || 'Admin'}!</p>

          </motion.div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              title="Total Users" 
              value={stats.users} 
              icon={<FaUsers size={24} className="text-white" />} 
              color="bg-green-600"
              onClick={() => navigate('/admin/users')}
            />
            <StatsCard 
              title="Articles Published" 
              value={stats.articles} 
              icon={<FaNewspaper size={24} className="text-white" />} 
              color="bg-blue-600"
              onClick={() => navigate('/admin/articles')}
            />
            <StatsCard 
              title="Total Views" 
              value={stats.views.toLocaleString()} 
              icon={<FaEye size={24} className="text-white" />} 
              color="bg-purple-600"
              onClick={() => navigate('/admin/analytics')}
            />
            <StatsCard 
              title="Engagement Rate" 
              value={`${stats.engagement}%`} 
              icon={<FaChartPie size={24} className="text-white" />} 
              color="bg-yellow-500"
              onClick={() => navigate('/admin/analytics')}
            />
          </div>
          
          {/* Charts and Additional Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">User Growth</h3>
                <button className="text-sm text-green-600 hover:text-green-800">View All</button>
              </div>
              <UserStatsChart data={chartData} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
                <button className="text-sm text-green-600 hover:text-green-800">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <motion.div 
                    key={activity.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg"
                  >
                    <div className={`p-2 rounded-full mr-4 ${activity.type === 'user' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {activity.type === 'user' ? <FaUsers size={16} /> : <FaNewspaper size={16} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.name}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Quick Actions Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg"
              onClick={() => navigate('/admin/articles/create')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center cursor-pointer">
                <div className="p-4 bg-green-100 rounded-lg mr-4">
                  <FaPlus className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Create New Article</h3>
                  <p className="text-sm text-gray-500">Add new content to your platform</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-lg"
              onClick={() => navigate('/admin/articles')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center cursor-pointer">
                <div className="p-4 bg-blue-100 rounded-lg mr-4">
                  <FaEdit className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Manage Articles</h3>
                  <p className="text-sm text-gray-500">Edit or delete existing articles</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="p-6 text-center text-gray-500 text-sm">
          <p>© 2023 AgriGuard Admin Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;