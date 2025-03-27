
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEdit, FaTrash, FaEye, FaArrowLeft, FaSearch, FaBold, FaItalic, FaUnderline, FaCode, FaListUl, FaListOl, FaQuoteRight } from 'react-icons/fa';
import axios from 'axios';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4 bg-gray-100 p-2 rounded">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-300' : 'bg-white'}`}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-300' : 'bg-white'}`}
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded ${editor.isActive('underline') ? 'bg-gray-300' : 'bg-white'}`}
      >
        <FaUnderline />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`p-2 rounded ${editor.isActive('code') ? 'bg-gray-300' : 'bg-white'}`}
      >
        <FaCode />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-300' : 'bg-white'}`}
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-300' : 'bg-white'}`}
      >
        <FaListOl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-gray-300' : 'bg-white'}`}
      >
        <FaQuoteRight />
      </button>
    </div>
  );
};

const ArticleManagement = ({ isOpen, onClose }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '',
  });

  useEffect(() => {
    if (isOpen) {
      fetchArticles();
    }
  }, [isOpen]);

  useEffect(() => {
    if (Array.isArray(articles)) {
      const results = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArticles(results);
    }
  }, [searchTerm, articles]);

  useEffect(() => {
    if (editor && editingArticle) {
      editor.commands.setContent(editingArticle.content);
    }
  }, [editingArticle, editor]);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5557/api/articles');
      console.log('Fetch response:', response);

      if (response.data && Array.isArray(response.data)) {
        setArticles(response.data);
        setFilteredArticles(response.data);
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setArticles(response.data.data);
        setFilteredArticles(response.data.data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to fetch articles. Please try again.');
    } finally {
      setIsLoading(false);
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
      const response = await axios.delete(`http://localhost:5557/api/articles/${id}`);
      console.log('Delete response:', response);
  
      if (response.status === 200) {
        setArticles(articles.filter(article => article._id !== id));
        setFilteredArticles(filteredArticles.filter(article => article._id !== id));
        setSelectedArticle(null);
        setEditingArticle(null);
        setDeleteConfirmation(null);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
    }
  };
  
  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5557/api/articles/${editingArticle._id}`, {
        title: editingArticle.title,
        content: editor.getHTML()
      });
      console.log('Update response:', response);
  
      if (response.status === 200 && response.data) {
        const updatedArticle = response.data.article || response.data;
        const updatedArticles = articles.map(a => a._id === updatedArticle._id ? updatedArticle : a);
        setArticles(updatedArticles);
        setFilteredArticles(updatedArticles);
        setEditingArticle(null);
      } else {
        console.error('Unexpected response status or data:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error saving article:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
    }
  };

  const handleBack = () => {
    setSelectedArticle(null);
    setEditingArticle(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="bg-white rounded-lg p-8 w-[90vw] h-[90vh] max-w-7xl overflow-y-auto"get         >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Manage Articles</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>
          
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {isLoading ? (
            <p>Loading articles...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <AnimatePresence>
              {!selectedArticle && !editingArticle && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-6"
                >
                  {filteredArticles.map((article) => (
                    <motion.div
                      key={article._id}
                      layout
                      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <h3 className="font-semibold text-xl mb-2 text-gray-800">{article.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">{new Date(article.createdAt).toLocaleDateString()}</p>
                      <div className="text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: article.content }} />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleView(article)}
                          className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleEdit(article)}
                          className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteConfirmation(article._id)}
                          className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}

          <AnimatePresence>
            {(selectedArticle || editingArticle) && (
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg p-6 shadow-lg w-full"
            >
              <button onClick={handleBack} className="mb-4 text-blue-600 hover:text-blue-800 flex items-center">
                <FaArrowLeft className="mr-2" /> Back to Articles
              </button>
              {selectedArticle && (
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-gray-800">{selectedArticle.title}</h3>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
                  <p className="text-sm text-gray-500 mt-4">
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
                  <MenuBar editor={editor} />
                  <EditorContent editor={editor} className="prose max-w-none mb-4 p-4 border rounded min-h-[200px]" />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleBack}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
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

    <AnimatePresence>
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
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </AnimatePresence>
);
};

export default ArticleManagement;