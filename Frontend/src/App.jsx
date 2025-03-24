import React from "react";
import {Routes , Route} from 'react-router-dom';
import Navbar from "./Components/Navbar";

import CreateForm from './Pages/CreateForm';
import UserProfile from "./Pages/UserProfile";
import AiRecomendationForm from './Pages/AiRecomendationForm';
import UpdateSubmittedForm from "./Pages/UpdateSubmittedForm";
import DeleteSubmittedForm from "./Pages/DeleteSubmittedForm";


import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/Navbar';
import AdminDashboard from './Pages/AdminDashboard';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Main App Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminDashboard />} />
        <Route path="/admin/articles" element={<AdminDashboard />} />
        <Route path="/admin/articles/create" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminDashboard />} />

        {/* Inquiry Form & AI Recommendation Routes */}
        <Route path="/createinquiry" element={<CreateForm />} />
        <Route path="/updateinquiry/:id" element={<UpdateSubmittedForm />} />
        <Route path="/deleteinquiry/:id" element={<DeleteSubmittedForm />} />
        <Route path="/aitreatment" element={<AiRecomendationForm />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
   </>
  );
};

export default App;
