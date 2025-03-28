
import React from "react";
import {Routes , Route} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import CreateForm from './Pages/CreateForm';
import UserProfile from "./Pages/UserProfile";
import AiRecomendationForm from './Pages/AiRecomendationForm';
import UpdateSubmittedForm from "./Pages/UpdateSubmittedForm";
import DeleteSubmittedForm from "./Pages/DeleteSubmittedForm";
import MyInquiries from './Pages/MyInquiries';
import ArticleView from './components/ArticleView';




import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './components/Navbar';
import LogNavBar from './components/LogingNavBar';
import AdminDashboard from './Pages/AdminDashboard';







import HomeMaterial from './pages/HomeMaterial';
import CreateMaterial from './pages/CreateMaterial';
import ShowMaterial from './pages/ShowMaterial';
 import EditMaterial from './pages/EditMaterial';
// import DeleteMaterial from './pages/DeleteMaterial';
import BuyMaterial from './pages/BuyMaterial';
import HomeAfterLogin from './Pages/HomeAfterLogin';
import UserManagement from './components/UserManagement';


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
        <Route path="/loghome" element={<HomeAfterLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminDashboard />} />
        <Route path="/admin/articles" element={<AdminDashboard />} />
        <Route path="/admin/articles/create" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminDashboard />} />
        <Route path="/lognavbar" element={<LogNavBar />} />
        <Route path="/admin/manageusers" element={<UserManagement />} />

        {/* Inquiry Form & AI Recommendation Routes */}
        <Route path="/createinquiry" element={<CreateForm />} />
        <Route path="/updateinquiry/:id" element={<UpdateSubmittedForm />} />
        <Route path="/deleteinquiry/:id" element={<DeleteSubmittedForm />} />
        <Route path="/aitreatment" element={<AiRecomendationForm />} />
        <Route path="/myinquiries" element={<MyInquiries />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/articles/:id" element={<ArticleView />} />
        <Route path="/viewarticles" element={<ArticleView />} />
          
          
          
          <Route path='/' element={<HomeMaterial />} />
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

