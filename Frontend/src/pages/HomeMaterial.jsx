import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdSearch } from "react-icons/md";
import { FaSort, FaEye } from "react-icons/fa";

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
      .get("http://localhost:4000/materials")
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Agricultural Materials
        </h1>
        <div className="flex space-x-4">
          {" "}
          {/* Wrapper div to align buttons */}
          <Link
            to="/materials/buy"
            className="bg-white text-green-500 px-4 py-2 rounded border border-green-500 hover:bg-green-500 hover:text-white transition-colors flex items-center"
          >
            Buy
          </Link>
          <Link
            to="/materials/create"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center"
          >
            Add a new Material
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-8 border border-gray-300 rounded"
          />
          <MdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green-400" />
        </div>
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
          className="p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center"
        >
          <FaSort className="mr-2" />
          Sort by Name
        </button>
        <button
          onClick={() => handleSort("pricePerUnit")}
          className="p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center"
        >
          <FaSort className="mr-2" />
          Sort by Price
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedMaterials.map((material) => (
            <div
              key={material._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex"
            >
              <div className="p-4 flex-1">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {material.materialName}
                </h2>
                <p className="text-gray-600 mb-2">
                  Category: {material.category}
                </p>
                <p className="text-gray-600 mb-4">
                  Price Per Unit: Rs.{material.pricePerUnit}/{material.unitType}
                </p>
                <Link
                  to={`/materials/details/${material._id}`}
                  className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors"
                >
                  <FaEye className="text-xl" />
                </Link>
              </div>
              <div className="w-1/3 bg-gray-200">
                {material.image ? (
                  <img
                    src={material.image}
                    alt={material.materialName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredAndSortedMaterials.length === 0 && (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">
            No materials found. Start by adding a new material.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomeMaterial;
