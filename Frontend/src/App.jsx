import React from "react";
import {Routes , Route} from 'react-router-dom';
import CreateForm from './Pages/CreateForm';
import UserProfile from "./Pages/UserProfile";
import AiRecomendationForm from './Pages/AiRecomendationForm';
import UpdateSubmittedForm from "./Pages/UpdateSubmittedForm";
import DeleteSubmittedForm from "./Pages/DeleteSubmittedForm";

const App = () => {
  return (
    <Routes>
      <Route path="/createinquiry" element={<CreateForm></CreateForm>}></Route>
      <Route path="/updateinquiry/:id" element={<UpdateSubmittedForm></UpdateSubmittedForm>}></Route>
      <Route path="/deleteinquiry/:id" element={<DeleteSubmittedForm></DeleteSubmittedForm>}></Route>
      <Route path="/aitreatment" element={<AiRecomendationForm></AiRecomendationForm>}></Route>
      <Route path="/userprofile" element={<UserProfile></UserProfile>}></Route>
    </Routes>
  )
}

export default App