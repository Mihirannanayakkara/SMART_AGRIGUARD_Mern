import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const MyInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData || !userData.token) {
        throw new Error('No user data found');
      }
  
      const response = await axios.get('http://localhost:5557/farmer', {
        headers: {
          'Authorization': `Bearer ${userData.token}`
        }
      });
  
      if (response.data && Array.isArray(response.data.data)) {
        setInquiries(response.data.data);
      } else {
        throw new Error('Received invalid data format');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setError(error.message || 'Failed to load inquiries');
      enqueueSnackbar('Failed to load inquiries', { variant: 'error' });
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      await axios.delete(`http://localhost:5557/farmer/${id}`, {
        headers: {
          'Authorization': `Bearer ${userData.token}`
        }
      });
      setInquiries(inquiries.filter(inquiry => inquiry._id !== id));
      enqueueSnackbar('Inquiry deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      enqueueSnackbar('Failed to delete inquiry', { variant: 'error' });
    }
  };

  const handleUpdate = (inquiry) => {
    navigate(`/updateform/${inquiry._id}`, { state: { inquiry } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!Array.isArray(inquiries) || inquiries.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-600 mb-8">Your Inquiries</h1>
        <p className="text-gray-600">No inquiries found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Your Inquiries</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-2">Plant Name</th>
              <th className="px-4 py-2">Disease</th>
              <th className="px-4 py-2">Submitted On</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">{inquiry.plantName}</td>
                <td className="px-4 py-2">{inquiry.diseaseName}</td>
                <td className="px-4 py-2">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedInquiry(inquiry)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FaEye className="inline mr-1" />
                  </button>
                  <button
                    onClick={() => handleUpdate(inquiry)}
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                  >
                    <FaEdit className="inline mr-1" />
                  </button>
                  <button
                    onClick={() => handleDelete(inquiry._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="inline mr-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedInquiry && (
        <InquiryDetailsPopup
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
        />
      )}
    </div>
  );
};

export default MyInquiries;