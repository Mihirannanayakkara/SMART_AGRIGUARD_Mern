import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { FaSort, FaEye, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import SupplierSidebar from "../components/SupplierSidebar";

const HomeMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("materialName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5557/materials")
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
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredAndSortedMaterials = materials
    .filter(
      (material) =>
        material.materialName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (filterCategory === "" || material.category === filterCategory)
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="flex h-screen">
      <SupplierSidebar />
      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="w-full md:w-1/3 relative">
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
              />
              <MdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green-400" />
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="">All Categories</option>
                <option value="Fertilizer">Fertilizer</option>
                <option value="Pesticide">Pesticide</option>
                <option value="Herbicide">Herbicide</option>
              </select>
              <button
                onClick={() => handleSort("materialName")}
                className="p-2 bg-gray-100 text-gray-700 rounded hover:bg-green-400 transition-colors flex items-center"
              >
                <FaSort className="mr-2" />
                Sort by Name
              </button>
              <button
                onClick={() => handleSort("pricePerUnit")}
                className="p-2 bg-gray-100 text-gray-700 rounded hover:bg-green-400 transition-colors flex items-center"
              >
                <FaSort className="mr-2" />
                Sort by Price
              </button>
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedMaterials.map((material) => (
  <div
    key={material._id}
    className="bg-white shadow-md rounded-xl overflow-hidden"
  >
    <Link to={`/materials/details/${material._id}`} className="flex h-full">
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-gray-600 text-xs uppercase">{material.category}</span>
        <h2 className="text-lg font-bold text-gray-800 capitalize mb-2 truncate">{material.materialName}</h2>
        <p className="text-gray-600 mb-4">Price: Rs.{material.pricePerUnit}/{material.unitType}</p>
        <div className="mt-auto flex items-center justify-between">
        <FaEye className="text-green-600" size={16} />
          
        </div>
      </div>
      <div className="w-1/3 overflow-hidden">
        <img
          src={material.image || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={material.materialName}
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  </div>
))}
            </section>
          )}

          {!loading && filteredAndSortedMaterials.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-xl text-gray-600">
                No materials found. Start by adding a new material.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeMaterial;
