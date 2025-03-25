import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeMaterial from './pages/HomeMaterial';
import CreateMaterial from './pages/CreateMaterial';
import ShowMaterial from './pages/ShowMaterial';
 import EditMaterial from './pages/EditMaterial';
// import DeleteMaterial from './pages/DeleteMaterial';
import BuyMaterial from './pages/BuyMaterial';



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeMaterial />} />
      <Route path='/materials/create' element={<CreateMaterial />} />
      <Route path='/materials/details/:id' element={<ShowMaterial />} />
     <Route path='/materials/edit/:id' element={<EditMaterial />} /> 
      {/* <Route path='/materials/delete/:id' element={<DeleteMaterial />} /> */}
      <Route path='/materials/buy' element={<BuyMaterial />} />
        
    </Routes>
  );
};

export default App;