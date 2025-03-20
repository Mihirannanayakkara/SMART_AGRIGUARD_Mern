import React, { useState, useCallback } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDropzone } from "react-dropzone";
import { FaSave, FaUpload, FaSeedling } from "react-icons/fa";

const CreateMaterial = () => {
  const [materialName, setMaterialName] = useState("");
  const [category, setCategory] = useState("");
  const [diseaseUsage, setDiseaseUsage] = useState([]);
  const [usageInstructions, setUsageInstructions] = useState("");
  const [unitType, setUnitType] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierContact, setSupplierContact] = useState("");
  const [image, setImage] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  
  const handleSaveMaterial = () => {
    const data = {
      materialName,
      category,
      diseaseUsage,
      usageInstructions,
      unitType,
      pricePerUnit,
      supplierName,
      supplierContact,
      image,
    };
    setLoading(true);
    axios
      .post("http://localhost:4000/materials", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Material Created successfully", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-green-600 text-white">
          <h2 className="text-2xl font-bold flex items-center justify-center">
            Add New Material
          </h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveMaterial();
          }}
          className="px-4 py-5 sm:p-6"
        >
          {loading && <Spinner />}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="materialName"
                className="block text-sm font-medium text-gray-700"
              >
                Material Name
              </label>
              <input
                type="text"
                name="materialName"
                id="materialName"
                value={materialName}
                onChange={(e) => setMaterialName(e.target.value)}
                className={`mt-1 block w-full border ${
                  errors.materialName ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Category</option>
                <option value="Fertilizer">Fertilizer</option>
                <option value="Pesticide">Pesticide</option>
                <option value="Herbicide">Herbicide</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="unitType"
                className="block text-sm font-medium text-gray-700"
              >
                Unit Type
              </label>
              <select
                name="unitType"
                id="unitType"
                value={unitType}
                onChange={(e) => setUnitType(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Unit</option>
                <option value="kg">kg</option>
                <option value="liters">liters</option>
                <option value="packs">packs</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="pricePerUnit"
                className="block text-sm font-medium text-gray-700"
              >
                Price Per Unit
              </label>
              <input
                type="number"
                name="pricePerUnit"
                id="pricePerUnit"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="supplierName"
                className="block text-sm font-medium text-gray-700"
              >
                Supplier Name
              </label>
              <input
                type="text"
                name="supplierName"
                id="supplierName"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="supplierContact"
                className="block text-sm font-medium text-gray-700"
              >
                Supplier Contact
              </label>
              <input
                type="text"
                name="supplierContact"
                id="supplierContact"
                value={supplierContact}
                onChange={(e) => setSupplierContact(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Disease Usage
            </label>
            <div className="mt-2 space-y-2">
              {["Plant Growth", "Insect Control", "Weed Killers"].map(
                (option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={option}
                      name="diseaseUsage"
                      value={option}
                      checked={diseaseUsage.includes(option)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDiseaseUsage([...diseaseUsage, option]);
                        } else {
                          setDiseaseUsage(
                            diseaseUsage.filter((item) => item !== option)
                          );
                        }
                      }}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={option}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="usageInstructions"
              className="block text-sm font-medium text-gray-700"
            >
              Usage Instructions
            </label>
            <textarea
              name="usageInstructions"
              id="usageInstructions"
              rows="3"
              value={usageInstructions}
              onChange={(e) => setUsageInstructions(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>
          <div className="mt-6">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Material Image
            </label>
            <div
              {...getRootProps()}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            >
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                  >
                    <span>Upload a file</span>
                    <input
                      {...getInputProps()}
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Uploaded material"
                className="h-32 w-32 object-cover rounded-md"
              />
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FaSave className="mr-2" />
              Save Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMaterial;
