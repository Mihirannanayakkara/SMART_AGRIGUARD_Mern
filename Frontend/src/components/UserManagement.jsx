import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaUserPlus, FaSearch, FaTimes, FaChevronDown, FaFilter } from 'react-icons/fa';
import defaultAvatar from '../assets/default-avatar.jpg';
import AdminSidebar from './AdminSidebar';
import ManagerTopNavBar from '../components/ManagerNavBar';

const API_BASE_URL = 'http://localhost:5557/api';


const roleColors = {
  'farmer': 'bg-green-100 text-green-800',
  'OrganicFarmer': 'bg-blue-100 text-blue-800',
  'cropFarmer': 'bg-yellow-100 text-yellow-800',
  'greenhouseFarmer': 'bg-purple-100 text-purple-800',
  'forester': 'bg-indigo-100 text-indigo-800',
  'gardener': 'bg-pink-100 text-pink-800',
  'soilTester': 'bg-gray-100 text-gray-800',
  'agriculturalResearcher': 'bg-orange-100 text-orange-800'
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [sortColumn, setSortColumn] = useState('username');
  const [sortDirection, setSortDirection] = useState('asc');
  const [roleFilter, setRoleFilter] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setNotification({ show: true, message: 'Error fetching users. Please try again later.', type: 'error' });
      setLoading(false);
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedUsers = users ? [...users].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  }) : [];

  const filteredUsers = sortedUsers.filter((user) => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return (
      (user.username?.toLowerCase().includes(lowercaseSearchTerm) ||
      user.email?.toLowerCase().includes(lowercaseSearchTerm) ||
      user.role?.toLowerCase().includes(lowercaseSearchTerm)) &&
      (roleFilter === '' || user.role === roleFilter)
    );
  });

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsModalVisible(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };
  
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${userToDelete._id}`);
      setUsers(users.filter(user => user._id !== userToDelete._id));
      setNotification({ show: true, message: 'User deleted successfully', type: 'success' });
    } catch (err) {
      console.error('Error deleting user:', err);
      setNotification({ show: true, message: 'Error deleting user. Please try again later.', type: 'error' });
    } finally {
      setShowDeleteConfirmation(false);
      setUserToDelete(null);
    }
  };

  const onFinish = async (event) => {
    event.preventDefault();
    setSubmitting(true);
  
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());
  
    try {
      let response;
      if (currentUser) {
        response = await axios.put(`${API_BASE_URL}/users/${currentUser._id}`, userData);
        setUsers(users.map(user => user._id === currentUser._id ? response.data : user));
      } else {
        response = await axios.post(`${API_BASE_URL}/users`, userData);
        setUsers([...users, response.data]);
      }
      setIsModalVisible(false);
      setCurrentUser(null);
      setNotification({ show: true, message: currentUser ? 'User updated successfully' : 'User created successfully', type: 'success' });
    } catch (err) {
      console.error('Error saving user:', err);
      setNotification({ show: true, message: err.response?.data?.message || 'Error saving user. Please try again later.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Add ManagerTopNavBar here */}
        <ManagerTopNavBar />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <h2 className="text-3xl mt-16 font-bold mb-6 text-center text-gray-800">User Management</h2>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search users"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Roles</option>
            {Object.keys(roleColors).map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddUser}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center"
        >
          <FaUserPlus className="mr-2" /> Add New User
        </motion.button>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Avatar', 'Username', 'Email', 'Role', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(header.toLowerCase())}
                >
                  <div className="flex items-center">
                    {header}
                    {sortColumn === header.toLowerCase() && (
                      <FaChevronDown
                        className={`ml-1 ${
                          sortDirection === 'desc' ? 'transform rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full"
                  ></motion.div>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={user.avatar || defaultAvatar} alt="Avatar" className="h-10 w-10 rounded-full" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleColors[user.role] || 'bg-gray-100 text-gray-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditUser(user)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteUser(user)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-8 max-w-md w-full"
              >
                <h3 className="text-2xl font-bold mb-4">{currentUser ? 'Edit User' : 'Add New User'}</h3>
                <form onSubmit={onFinish}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      defaultValue={currentUser?.username}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={currentUser?.email}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      defaultValue={currentUser?.role}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      {Object.keys(roleColors).map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  {!currentUser && (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                  )}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsModalVisible(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                      {submitting ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
  
        <AnimatePresence>
          {showDeleteConfirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-8 max-w-md w-full"
              >
                <h3 className="text-2xl font-bold mb-4">Confirm Delete</h3>
                <p className="mb-4">Are you sure you want to delete this user?</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowDeleteConfirmation(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
  
        <AnimatePresence>
          {notification.show && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
                notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white`}
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      </div>
      </div>
    );
  };
  
  export default UserManagement;