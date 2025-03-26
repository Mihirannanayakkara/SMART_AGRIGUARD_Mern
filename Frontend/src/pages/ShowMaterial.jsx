import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEdit,
  FaArrowLeft,
  FaBox,
  FaInfoCircle,
  FaDollarSign,
  FaPhone,
  FaTint,
  FaUser,
  FaBook,
  FaTrash,
  FaSeedling,
  FaLeaf,
} from "react-icons/fa";
import { useSnackbar } from "notistack";

const ShowMaterial = () => {
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5557/materials/${id}`)
      .then((response) => {
        setMaterial(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:4000/materials/${id}`)
      .then(() => {
        setShowDeleteModal(false);
        setLoading(false);
        enqueueSnackbar("Material deleted successfully", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setShowDeleteModal(false);
        setLoading(false);
        enqueueSnackbar("Error deleting material", { variant: "error" });
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!material) {
    return <div>Material not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center mb-6 text-blue-500 hover:text-blue-600"
        >
          <FaArrowLeft className="mr-2" />
          Back 
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white shadow rounded-lg p-6">
            <div className="mb-6">
              <img
                src={material.image}
                alt={material.materialName}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {material.materialName}
              </h2>
              <p className="text-gray-600">{material.category}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600 flex items-center">
                   Disease Usage
                </span>
                <span className="font-medium">
                  {material.diseaseUsage.join(", ")}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600 flex items-center">
                   Price per
                  Unit
                </span>
                <span className="font-medium">Rs.{material.pricePerUnit}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600 flex items-center">
                  Unit Type
                </span>
                <span className="font-medium">{material.unitType}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaBook className="mr-2 text-orange-500" />
                Usage Instructions
              </h3>
              <p className="text-gray-700">{material.usageInstructions}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaUser className="mr-2 text-indigo-500" />
                Supplier Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Supplier Name</p>
                  <p className="font-medium">{material.supplierName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Contact Information</p>
                  <p className="font-medium flex items-center">
                    
                    {material.supplierContact}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4"></div>
              <div className="flex space-x-4">
                <Link
                  to={`/materials/edit/${id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600"
                >
                  <FaEdit className="mr-2" /> Edit Material
                </Link>
                <button
                  onClick={openDeleteModal}
                  className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600"
                >
                  <FaTrash className="mr-2" /> Delete Material
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Delete Confirmation
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this material? This action
                    cannot be undone.
                  </p>
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="mt-3 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ShowMaterial;
