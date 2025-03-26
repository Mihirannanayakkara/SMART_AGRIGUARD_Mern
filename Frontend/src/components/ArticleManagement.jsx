import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEdit, FaTrash, FaEye, FaArrowLeft, FaSearch } from 'react-icons/fa';
import axios from 'axios';

const ArticleManagement = ({ isOpen, onClose }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchArticles();
    }
  }, [isOpen]);

  useEffect(() => {
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(results);
  }, [searchTerm, articles]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5557/api/articles');
      setArticles(response.data);
      setFilteredArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleView = (article) => {
    setSelectedArticle(article);
    setEditingArticle(null);
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setSelectedArticle(null);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5557/api/articles/${id}`);
      setArticles(articles.filter(article => article._id !== id));
      setFilteredArticles(filteredArticles.filter(article => article._id !== id));
      setSelectedArticle(null);
      setEditingArticle(null);
      setDeleteConfirmation(null);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5557/api/articles/${editingArticle._id}`, {
        title: editingArticle.title,
        content: editingArticle.content
      });
      const updatedArticle = response.data;
      const updatedArticles = articles.map(a => a._id === updatedArticle._id ? updatedArticle : a);
      setArticles(updatedArticles);
      setFilteredArticles(updatedArticles);
      setEditingArticle(null);
    } catch (error) {
      console.error('Error saving article:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleBack = () => {
    setSelectedArticle(null);
    setEditingArticle(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-gradient-to-br from-green-400 to-white rounded-lg p-8 w-full max-w-7xl max-h-[90vh] overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Manage Articles</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={24} />
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <motion.div
              layout
              className="flex h-[calc(90vh-180px)]"
            >
              <AnimatePresence>
                {!selectedArticle && !editingArticle && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto w-full pr-4"
                  >
                    {filteredArticles.map((article) => (
                      <motion.div
                        key={article._id}
                        layout
                        className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow relative"
                      >
                        <h3 className="font-semibold text-xl mb-2 text-gray-800">{article.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{new Date(article.createdAt).toLocaleDateString()}</p>
                        <p className="text-gray-600 mb-16 line-clamp-3">{article.content}</p>
                        <div className="absolute bottom-4 right-4 flex space-x-2">
                          <button
                            onClick={() => handleView(article)}
                            className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200"
                            title="View"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleEdit(article)}
                            className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteConfirmation(article._id)}
                            className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {(selectedArticle || editingArticle) && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-lg p-6 shadow-lg w-full overflow-y-auto"
                  >
                    <button onClick={handleBack} className="mb-4 text-blue-600 hover:text-blue-800 flex items-center">
                      <FaArrowLeft className="mr-2" /> Back to Articles
                    </button>
                    {selectedArticle && (
                      <div>
                        <h3 className="text-3xl font-bold mb-4 text-gray-800">{selectedArticle.title}</h3>
                        <p className="text-gray-600 mb-6 whitespace-pre-wrap">{selectedArticle.content}</p>
                        <p className="text-sm text-gray-500">
                          Published on: {new Date(selectedArticle.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {editingArticle && (
                      <div>
                        <input
                          type="text"
                          value={editingArticle.title}
                          onChange={(e) => setEditingArticle({...editingArticle, title: e.target.value})}
                          className="w-full p-2 mb-4 border rounded text-xl font-bold"
                          placeholder="Article Title"
                        />
                        <textarea
                          value={editingArticle.content}
                          onChange={(e) => setEditingArticle({...editingArticle, content: e.target.value})}
                          className="w-full p-2 mb-4 border rounded h-96"
                          placeholder="Article Content"
                        />
                        <div className="flex justify-end space-x-2">
                          <button onClick={handleSave} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                            Save
                          </button>
                          <button onClick={handleBack} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      {deleteConfirmation && (
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
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this article? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleDelete(deleteConfirmation)}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleManagement;