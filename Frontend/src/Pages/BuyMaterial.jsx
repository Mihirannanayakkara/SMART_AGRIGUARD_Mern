import React, { useEffect, useState } from 'react';
import { FaSort, FaEye, FaShoppingCart, FaLeaf, FaPlus, FaMinus } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const BuyMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('materialName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCategory, setFilterCategory] = useState('');
  const [cart, setCart] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:4000/materials')
      .then((response) => {
        setMaterials(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleQuantityChange = (materialId, change) => {
    setCart(prevCart => {
      const newQuantity = (prevCart[materialId] || 0) + change;
      if (newQuantity <= 0) {
        const { [materialId]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [materialId]: newQuantity };
    });
  };

  const filteredAndSortedMaterials = materials
    .filter((material) =>
      material.materialName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === '' || material.category === filterCategory)
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 flex items-center">
            <FaLeaf className="mr-2 text-green-600" />
            Buy Materials
          </h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors flex items-center shadow-md text-sm">
            <FaShoppingCart className="mr-2" />
            Cart ({Object.keys(cart).length})
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <div className="flex-1 min-w-[200px] relative">
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
              />
              <MdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
            >
              <option value="">All Categories</option>
              <option value="Fertilizer">Fertilizer</option>
              <option value="Pesticide">Pesticide</option>
              <option value="Herbicide">Herbicide</option>
            </select>
            <button
              onClick={() => handleSort('materialName')}
              className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center text-sm"
            >
              <FaSort className="mr-1" />
              Name
            </button>
            <button
              onClick={() => handleSort('pricePerUnit')}
              className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center text-sm"
            >
              <FaSort className="mr-1" />
              Price
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredAndSortedMaterials.map((material) => (
              <div key={material._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative h-32">
                  {material.image ? (
                    <img 
                      src={material.image} 
                      alt={material.materialName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <h2 className="text-sm font-semibold text-gray-800 truncate">{material.materialName}</h2>
                  <p className="text-xs text-gray-600">{material.category}</p>
                  <p className="text-sm font-bold text-green-600 mt-1">Rs.{material.pricePerUnit}/{material.unitType}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleQuantityChange(material._id, -1)}
                        className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2 text-sm font-semibold">{cart[material._id] || 0}</span>
                      <button 
                        onClick={() => handleQuantityChange(material._id, 1)}
                        className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button 
                      onClick={() => handleQuantityChange(material._id, 1)}
                      className="bg-green-600 text-white px-2 py-1 rounded-full hover:bg-green-700 transition-colors text-xs"
                    >
                      Add
                    </button>
                  </div>
                  <Link 
                    to={`/materials/details/${material._id}`} 
                    className="block text-center mt-2 text-xs text-green-600 hover:text-green-800 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredAndSortedMaterials.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600">No materials found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyMaterial;