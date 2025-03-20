import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import BackButton from "../components/BackButton";

const ShowMaterial = () => {
  const [material, setMaterial] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/materials/${id}`)
      .then((response) => {
        setMaterial(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar("Error fetching material details", {
          variant: "error",
        });
      });
  }, [id, enqueueSnackbar]);

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
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-green-600 text-white">
          <h2 className="text-2xl font-bold text-center">
            {material.materialName}
          </h2>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {material.image && (
            <div className="mb-6 flex justify-center">
              <img
                src={material.image}
                alt={material.materialName}
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{ maxHeight: "200px" }}
              />
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <DetailItem label="Category" value={material.category} />
            <DetailItem
              label="Disease Usage"
              value={material.diseaseUsage?.join(", ")}
            />
            <DetailItem label="Unit Type" value={material.unitType} />
            <DetailItem
              label="Price Per Unit"
              value={`Rs.${material.pricePerUnit}`}
            />
            <DetailItem label="Supplier Name" value={material.supplierName} />
            <DetailItem
              label="Supplier Contact"
              value={material.supplierContact}
            />
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              Usage Instructions
            </h3>
            <p className="text-gray-700 leading-relaxed border-l-4 border-green-500 pl-4">
              {material.usageInstructions}
            </p>
          </div>
          <div className="mt-6 text-sm text-gray-500 border-t pt-4 flex justify-between">
            <p>Created: {new Date(material.createdAt).toLocaleString()}</p>
            <p>Last Updated: {new Date(material.updatedAt).toLocaleString()}</p>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <Link
              to={`/materials/edit/${material._id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <FaEdit className="mr-2" />
              Edit
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FaTrash className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this material?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900">{value}</dd>
  </div>
);

export default ShowMaterial;
