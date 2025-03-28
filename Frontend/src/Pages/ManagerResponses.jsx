import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaTimes, FaCalendar, FaLeaf, FaVirus ,FaFileAlt } from 'react-icons/fa';

const mockResponses = [
  {
    _id: '1',
    plantName: 'Tomato',
    diseaseName: 'Early Blight',
    updatedAt: '2023-07-15T10:30:00Z',
    managerResponse: 'ACopper-based fungicides have been a trusted solution for gardeners and farmers for many years. They are used to combat various fungal diseases that affect plants, such as powdery mildew, blight, rust, downy mildew, and even some bacterial infections. Copper fungicides work by acting as a protective barrier that prevents fungal spores from germinating and spreading. The copper ions in the fungicide are toxic to fungal cells, making it a powerful defense mechanism for plantss.However, as with any gardening treatment, the key to effective use lies in proper application. Heres a more thorough look at how to correctly apply copper-based fungicides',
    imageUrl: 'https://thumbs.dreamstime.com/b/tomato-plant-disease-greenhouse-74286976.jpg?w=768'
  },
  {
    _id: '2',
    plantName: 'Rose',
    diseaseName: 'Black Spot',
    updatedAt: '2023-07-13T09:15:00Z',
    managerResponse: 'To effectively manage fungal infections, it’s important to first remove any infected leaves or plant material, as these can serve as a source of further contamination, and then apply a suitable fungicide to protect the remaining healthy parts of the plant from future outbreaks. Additionally, improving air circulation around the plants by ensuring proper spacing, pruning dense growth, and avoiding overcrowding will help reduce humidity and create an environment less favorable for the spread of fungal spores.',
    imageUrl: 'https://thumbs.dreamstime.com/b/roses-petal-damage-plant-disease-roses-petal-damage-plant-disease-high-quality-photo-ai-generated-363975468.jpg?w=992'
  }
];

const ManagerResponses = () => {
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" 
    style={{ 
      backgroundImage: "url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      backgroundColor: "rgba(243, 244, 246, 1.2)",
      backgroundBlendMode: "overlay"
    }}>
    <motion.div 
      initial={{ opacity: 0 ,y: 20 }}
      animate={{ opacity: 1 , y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-14 "
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-12">Manager Responses</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mockResponses.map((inquiry) => (
          <motion.div
            key={inquiry._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="h-48 bg-green-100 relative">
              <img 
                src={inquiry.imageUrl} 
                alt={inquiry.plantName} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h2 className="text-2xl font-bold text-white">{inquiry.plantName}</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">Disease: {inquiry.diseaseName}</p>
              <p className="text-gray-500 mb-4 flex items-center">
                <FaCalendar className="mr-2" />
                {new Date(inquiry.updatedAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4 line-clamp-3">{inquiry.managerResponse}</p>
              <div className="flex justify-between items-center">
  <button
    onClick={() => setSelectedInquiry(inquiry)}
    className="flex items-center text-green-600 hover:text-green-800 transition-colors duration-300"
  >
    <FaEye className="mr-2" />
    View Full Details
  </button>
  <button
    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
  >
    <FaFileAlt className="mr-2" />
    Generate Report
  </button>
</div>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedInquiry && (
        <InquiryDetailsPopup
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
        />
      )}
    </motion.div>
    </div>
  );
};

const InquiryDetailsPopup = ({ inquiry, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 z-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-green-100">
            <img
              src={inquiry.imageUrl}
              alt={inquiry.plantName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-3/5 p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-3xl font-bold text-green-600 mb-6">{inquiry.plantName}</h2>
            <div className="space-y-4 mb-6">
              <DetailItem icon={FaVirus} label="Disease" value={inquiry.diseaseName} />
              <DetailItem
                icon={FaCalendar}
                label="Responded on"
                value={new Date(inquiry.updatedAt).toLocaleDateString()}
              />
              <DetailItem icon={FaLeaf} label="Status" value="Resolved" />
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Manager's Response</h3>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{inquiry.managerResponse}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
    
  );
};

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center">
    <Icon className="text-green-500 mr-2" size={20} />
    <span className="text-gray-700 font-medium">{label}:</span>
    <span className="ml-2 text-gray-600">{value}</span>
  </div>
);

export default ManagerResponses;