import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import { JWT_SECRET } from "../config.js";
import authenticateToken from "../Middleware/authMiddleware.js";

const router = express.Router();

// User Registration Route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role, fullName, phoneNumber, location } = req.body;

    // Check if user already exists by email or username
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "farmer", // Default role if not provided
      fullName,
      phoneNumber,
      location,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user._id, username: user.username, role: user.role });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server error" });
  }
});//user count
router.get('/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user count', error: error.message });
  }
});



// User Registration Stats Route
router.get('/registration-stats', async (req, res) => {
  try {
    const users = await User.find({}, 'createdAt');
    const stats = {};

    users.forEach(user => {
      const date = user.createdAt.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
      stats[date] = (stats[date] || 0) + 1;
    });

    const sortedDates = Object.keys(stats).sort();
    const labels = sortedDates;
    const values = sortedDates.map(date => stats[date]);

    res.json({ labels, values });
  } catch (error) {
    console.error('Error fetching user registration stats:', error);
    res.status(500).json({ message: 'Error fetching user registration stats' });
  }
});




export default router;  
