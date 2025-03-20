import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt } from 'react-icons/fa';

const IdentifyDiseaseTab = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Identify Plant Disease</h2>
      <div className="mb-4">
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center">
            {selectedImage ? (
              <img src={selectedImage} alt="Selected plant" className="max-w-full h-auto mx-auto" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-5xl text-green-500 mx-auto mb-2" />
                <p>Click to upload an image or drag and drop</p>
              </>
            )}
          </div>
          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>
      <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">
        Identify Disease
      </button>
    </motion.div>
  );
};

export default IdentifyDiseaseTab;