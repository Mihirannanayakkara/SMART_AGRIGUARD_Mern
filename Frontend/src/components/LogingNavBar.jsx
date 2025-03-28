import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../src/index.css";

const NavigationBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkLoginStatus = () => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("authToken");
  
        if (storedUser && token) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      };
  
      checkLoginStatus();
      window.addEventListener('storage', checkLoginStatus);
  
      return () => {
        window.removeEventListener('storage', checkLoginStatus);
      };
    }, []);
  
    const handleSignOut = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
    };

    return (
        <header className="header top-0 sticky bg-transparent backdrop-filter backdrop-blur-lg flex items-center justify-between mx-auto px-16 left-0 w-full z-10">
            <div className="w-3/12">
                <h1 className="text-3xl font-bold">
                    <Link to="/" className="text-white hover:text-green-500">AgriGuard</Link>
                </h1>
            </div>

            <nav className="nav font-semibold text-lg">
                <ul className="flex items-center justify-center space-x-6">
                    <li className="p-4 border-b-2 border-green-600 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                        <Link to="/" className="text-white hover:text-green-500">Home</Link>
                    </li>
                    <li className="p-4 border-b-2 border-green-600 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                        <Link to="/articles" className="text-white hover:text-green-500">Articles</Link>
                    </li>
                    <li className="p-4 border-b-2 border-green-600 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                        <Link to="/agristore" className="text-white hover:text-green-500">AgriStore</Link>
                    </li>
                    <li className="p-4 border-b-2 border-green-600 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                        <Link to="/ai-treatments" className="text-white hover:text-green-500">AI Treatments</Link>
                    </li>
                    <li className="p-4 border-b-2 border-green-600 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                        <Link to="/about-us" className="text-white hover:text-green-500">About Us</Link>
                    </li>
                </ul>
            </nav>

            <div className="w-3/12 flex justify-end items-center">
            {isLoggedIn && user ? (
    <>
        <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover mr-2"
        />
        <p className="text-sm font-semibold text-white mr-4">
            {user.username || "Unknown User"}
        </p>
        <button
            className="text-sm font-semibold text-white cursor-pointer bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition duration-300"
            onClick={handleSignOut}
        >
            Log Out
        </button>
    </>
) : null}
            </div>
        </header>
    );
};

export default NavigationBar;