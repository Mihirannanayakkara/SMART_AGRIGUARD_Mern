import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { register, login } from './routes/userRoutes.js';  // ✅ Named imports
import userRoutes from './routes/userRoutes.js';  // ✅ Default import
import testRoute from './routes/testRoute.js';  

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth Routes
app.use('/api/auth/register', register);
app.use('/api/auth/login', login);

// Test Routes
app.use('/api/test', testRoute);

// Default route
app.use('/', (request, response) => {
  response.send('Welcome to SMART_AGRIGUARD_Mern API');
});




mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
