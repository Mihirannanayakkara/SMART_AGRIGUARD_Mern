import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const EditMaterial = () => {
  const [formData, setFormData] = useState({
    materialName: '',
    category: '',
    diseaseUsage: [],
    usageInstructions: '',
    unitType: '',
    pricePerUnit: '',
    supplierName: '',
    supplierContact: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [diseaseOptions] = useState(['Plant Growth', 'Insect Control', 'Weed Killers']);
  const [unitTypeOptions] = useState(['kg', 'liters', 'packs']);
  const [categoryOptions] = useState(['Fertilizer', 'Pesticide', 'Seeds', 'Equipment']);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:4000/materials/${id}`)
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching material:', error);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDiseaseChange = (e) => {
    const { value, checked } = e.target;
    setFormData({
      ...formData,
      diseaseUsage: checked
        ? [...formData.diseaseUsage, value]
        : formData.diseaseUsage.filter((disease) => disease !== value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:4000/materials/${id}`, formData);
      setLoading(false);
      navigate(`/materials/details/${id}`);
    } catch (error) {
      console.error('Error updating material:', error);
      setLoading(false);
      alert('Error updating material');
    }
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFormData({
        ...formData,
        image: acceptedFiles[0],
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      <BackButton />
      <div className="bg-white rounded-xl shadow-md overflow-hidden mt-4">
      <div className="px-4 py-5 sm:px-6 bg-green-600 text-white">
  <h2 className="text-2xl font-bold text-center">
     {formData.materialName || 'Material'}
  </h2>
</div>
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <label htmlFor="materialName" className="font-medium mb-2">Material Name:</label>
            <input
              type="text"
              id="materialName"
              name="materialName"
              value={formData.materialName}
              onChange={handleInputChange}
              required
              placeholder="Enter the material name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="font-medium mb-2">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="unitType" className="font-medium mb-2">Unit Type:</label>
            <select
              id="unitType"
              name="unitType"
              value={formData.unitType}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Unit Type</option>
              {unitTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="pricePerUnit" className="font-medium mb-2">Price per Unit:</label>
            <input
              type="number"
              id="pricePerUnit"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleInputChange}
              required
              placeholder="Enter price per unit"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="supplierName" className="font-medium mb-2">Supplier Name:</label>
            <input
              type="text"
              id="supplierName"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleInputChange}
              required
              placeholder="Enter supplier name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="supplierContact" className="font-medium mb-2">Supplier Contact:</label>
            <input
              type="text"
              id="supplierContact"
              name="supplierContact"
              value={formData.supplierContact}
              onChange={handleInputChange}
              required
              placeholder="Enter supplier contact"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label className="font-medium mb-2">Disease Usage:</label>
            <div className="space-y-2">
              {diseaseOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={option}
                    value={option}
                    checked={formData.diseaseUsage.includes(option)}
                    onChange={handleDiseaseChange}
                    className="mr-2"
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="usageInstructions" className="font-medium mb-2">Usage Instructions:</label>
            <textarea
              id="usageInstructions"
              name="usageInstructions"
              value={formData.usageInstructions}
              onChange={handleInputChange}
              required
              placeholder="Enter instructions on how to use the material"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Material
        </button>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default EditMaterial;