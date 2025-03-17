import React, { useState } from "react";
import axios from "axios";
import "../../src/index.css";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import BackgroundSvg from "../images/114.svg"; // Import the background SVG

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Send registration request
      const response = await axios.post(
          "http://localhost:5000/api/register",
          formData
      );

      // Retrieve and store JWT token
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Show success notification using toast
      toast.success("Registration successful! You are now logged in.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Clear the form
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        country: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      // Error response handling
      console.error("Error during registration:", err.response?.data);
      setError(err.response?.data?.message || "Invalid input data, please try again.");
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Blurred Background */}
      <div
        style={{
          backgroundImage: `url(${BackgroundSvg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(5px)",
        }}
        className="absolute top-0 left-0 w-full h-full -z-10"
      ></div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-opacity-50"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.6)", // Add slight overlay for visibility
        }}
      />
      <div className="relative w-full min-h-screen m-auto overflow-hidden scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
        <h1 className="text-3xl mt-12 font-bold mb-6 justify-center text-green-600 flex">
          Register
        </h1>
        <form
          className="ml-auto mr-auto rounded-3xl px-10 pt-8 pb-10 mb-6 -mt-2 bg-white shadow-xl w-1/2"
          onSubmit={handleSubmit}
        >
          {/* First and Last Name */}
          <div className="flex justify-between gap-4">
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="shadow-lg my-1 focus:outline-none focus:border-green-600 appearance-none border rounded w-full py-3 px-4 text-gray-700"
                id="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="shadow-lg my-1 focus:outline-none focus:border-green-600 appearance-none border rounded w-full py-3 px-4 text-gray-700"
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Username and Email */}
          <div className="flex justify-between gap-4">
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow-lg my-1 focus:outline-none focus:border-green-600 appearance-none border rounded w-full py-3 px-4 text-gray-700"
                id="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow-lg my-1 focus:outline-none focus:border-green-600 appearance-none border rounded w-full py-3 px-4 text-gray-700"
                id="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Date of Birth, Gender, and Country */}
          <div className="flex justify-between gap-4">
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2"
                htmlFor="dateOfBirth"
              >
                Date of Birth
              </label>
              <input
                className="shadow-lg my-1 focus:outline-none focus:border-green-600 appearance-none border rounded w-full py-3 px-4 text-gray-700"
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mt-2  mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                className="shadow-lg my-1 focus:outline-none focus:border-green-600 appearance-none border rounded w-full py-3 px-4 text-gray-700"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2"
                htmlFor="country"
              >
                Country
              </label>
              <select
                className="shadow-lg my-1 focus:outline-none focus:border-green-600 appearance-none border rounded w-full py-3 px-4 text-gray-700"
                id="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Country
                </option>
                {["Afghanistan", "Albania"].map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="flex justify-between gap-4">
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mt-3 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow-lg my-1 focus:outline-none focus:border-green-600 appearance-none border rounded w-full py-3 px-4 text-gray-700"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="*********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mt-3 mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow-lg my-1 focus:outline-none focus:border-green-600 appearance-none border rounded w-full py-3 px-4 text-gray-700"
                id="confirmPassword"
                type="password"
                placeholder="*********"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-xs italic">{error}</p>}

          {/* Submit Button */}
          <div className="items-center justify-between">
            <button
              className="ml-auto mr-auto mt-7 flex items-center justify-center bg-green-600 hover:bg-green-800 text-white font-bold py-2.5 rounded-xl mx-3 px-36"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="text-center text-xs mt-2">
            Already have an account?
            <a className="ml-2 text-green-600 text-xs" href="/login">
              Sign in
            </a>
          </div>
        </form>

        {/* Toast Notification Container */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;