
import React from "react";
import {Routes , Route} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import CreateForm from './Pages/CreateForm';
import UserProfile from "./Pages/UserProfile";
import AiRecomendationForm from './Pages/AiRecomendationForm';
import UpdateSubmittedForm from "./Pages/UpdateSubmittedForm";
import DeleteSubmittedForm from "./Pages/DeleteSubmittedForm";
import MyInquiries from './Pages/MyInquiries';



import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './components/Navbar';
import AdminDashboard from './Pages/AdminDashboard';


import HomeMaterial from './Pages/HomeMaterial';
import CreateMaterial from './Pages/CreateMaterial';
import ShowMaterial from './Pages/ShowMaterial';
 import EditMaterial from './Pages/EditMaterial';
// import DeleteMaterial from './pages/DeleteMaterial';
import BuyMaterial from './Pages/BuyMaterial';



const App = () => {
  return (
    <>
    <SnackbarProvider maxSnack={3}>
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
        <Route path="/myinquiries" element={<MyInquiries />} />
        <Route path="/userprofile" element={<UserProfile />} />
          
          
          
          <Route path='/materials' element={<HomeMaterial />} />
      <Route path='/materials/create' element={<CreateMaterial />} />
      <Route path='/materials/details/:id' element={<ShowMaterial />} />
     <Route path='/materials/edit/:id' element={<EditMaterial />} /> 
      {/* <Route path='/materials/delete/:id' element={<DeleteMaterial />} /> */}
      <Route path='/materials/buy' element={<BuyMaterial />} />
      </Routes>
      </SnackbarProvider>
   </>
  );
};

export default App;

