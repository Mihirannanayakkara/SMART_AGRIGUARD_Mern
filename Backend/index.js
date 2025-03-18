import express from "express";
import { PORT , mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import FarmerFormRoute from "./Routes/FarmerFormRoutes.js";
import AiTreatmentRoute from "./Routes/AiTreatmentRoute.js";
import cors from "cors";


const app = express();

//Middlware for parsing request body
app.use(express.json());


//Middlware for handling cors ploicy request body
app.use(cors());


app.get('/',(request, response)=>{
    console.log(request)
    return response.status(234).send("welcome")
});

app.use('/farmer',FarmerFormRoute);
app.use('/ai', AiTreatmentRoute);


mongoose.connect(mongoDBURL)
.then(() => {
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });