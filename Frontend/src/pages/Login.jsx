import React, { useState } from "react";
import axios from "axios";
import { MdVisibility, MdVisibilityOff } from "react-icons/md"; // Import Material Design icons
import BackgroundSvg from "../images/117.svg"; // Import the background SVG
import "../../src/index.css";

const Login = () => {
  // State for username, password, and visibility toggle
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const [error, setError] = useState(""); // State to handle errors
  const [successMessage, setSuccessMessage] = useState(""); // State to display success message (optional)

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error state
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);
    
      // Extract token and user from the response
      const { token, user } = response.data;
    
      // Save them into localStorage
      if (token) {
        localStorage.setItem("authToken", token);
    
        if (user) {
          console.log("User Details:", user); // Log the user details to debug
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          console.error("User object is missing in the response.");
        }
      } else {
        console.error("Token is missing.");
      }
    
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Invalid username or password");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BackgroundSvg})`, // Use the imported SVG
          backgroundSize: "cover",
          filter: "blur(5px)", // Apply blur only to the background
          zIndex: -1, // Ensure it stays behind all content
        }}
      ></div>

      {/* Login Form */}
      <div className="w-full max-w-xs m-auto mt-10">
        <h1 className="text-3xl font-bold mb-6 justify-center text-green-600 align-middle flex mt-10">
          Login
        </h1>
        <form
          className="rounded-3xl px-10 pt-8 pb-10 mb-6 mt-auto bg-slate-20 border-spacing-4 shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow my-3 focus:border-green-600 focus:ring-6 appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow focus:border-green-600 focus:ring-6 appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {/* Password visibility toggle icon */}
            <span
              className="absolute inset-y-0 right-3 flex mt-7 items-center cursor-pointer text-gray-400 hover:text-green-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <MdVisibilityOff size={24} /> : <MdVisibility size={24} />}
            </span>
            {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-xs italic mt-2">{successMessage}</p>
            )}
          </div>
          <div className="items-center justify-between">
            <button
              className="bg-green-600 hover:bg-green-900 text-white font-bold py-2 rounded-xl mx-3 px-20 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <div className="text-center mt-5">
            <a
              className="inline-block align-baseline mr-4 text-xs text-green-600 hover:text-green-900"
              href="#"
            >
              Forgot Password?
            </a>
            <a
              href="/register"
              className="text-xs inline-block align-baseline text-black-500 hover:text-green-900"
            >
              Create an Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;