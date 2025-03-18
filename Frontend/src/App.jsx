import React from "react";
import {Routes , Route} from 'react-router-dom';
import CreateForm from './Pages/CreateForm';
import UserProfile from "./Pages/UserProfile";
import AiRecomendationForm from './Pages/AiRecomendationForm';

const App = () => {
  return (
    <Routes>
      <Route path="/inquryform" element={<CreateForm></CreateForm>}></Route>
      <Route path="/ai-recomendation" element={<AiRecomendationForm></AiRecomendationForm>}></Route>
      <Route path="/userprofile" element={<UserProfile></UserProfile>}></Route>
    </Routes>
  )
}

export default App