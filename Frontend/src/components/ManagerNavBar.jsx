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
        <header className="header fixed top-0 left-0 right-0 bg-green-700 backdrop-filter backdrop-blur-lg flex items-center justify-between px-4 py-4 z-50">
        <div className="w-4/12 pl-6">
            <h1 className="text-3xl font-bold">
                <Link to="/" className="text-white hover:text-green-200">AgriGuard</Link>
            </h1>
        </div>
    
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
                                className="text-sm font-semibold text-white cursor-pointer bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition duration-300"
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