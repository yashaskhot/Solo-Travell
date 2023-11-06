// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { connectToMongo } = require("../connection");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// // Signup Route
// router.post('/signup', async (req, res) => {
//   try {
//     const client = await connectToMongo();
//       const db = client.db("NewSampleDatabase");
//       const collection = db.collection("users");
//       const { username, password, userRole, type, age, occupation, phoneNumber, adminKey } = req.body;
      

//       // Create a new user instance with the provided data
//       const user = new User({
//         username,
//         password,
//         userRole,
//         type,
//         age,
//         occupation,
//         phoneNumber,
//         adminKey,
//       });
//     await mongoose.connect(
//         "mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority"
//       );
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' ,user});
//   } catch (error) {
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });
router.post('/signup', async (req, res) => {
  try {
    const client = await connectToMongo();
    const db = client.db("NewSampleDatabase");
    const collection = db.collection("users");
    const { username, password, userRole, type, age, occupation, phoneNumber, adminKey } = req.body;

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    if (adminKey) {
      // If adminKey is provided, check if it already exists in the database
      const existingAdmin = await collection.findOne({ adminKey });
      if (existingAdmin) {
        return res.status(400).json({ error: 'AdminKey already exists' });
      }
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const user = new User({
      username,
      password: hashedPassword, // Store the hashed password
      userRole,
      type,
      age,
      occupation,
      phoneNumber,
      adminKey,
    });

    await mongoose.connect(
      "mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority"
    );

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});


// router.post('/signup', async (req, res) => {
//   try {
//     const client = await connectToMongo();
//     const db = client.db("NewSampleDatabase");
//     const collection = db.collection("users");
//     const { username, password, userRole, type, age, occupation, phoneNumber, adminKey } = req.body;

//     // Hash the password before saving it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user instance with the hashed password
//     const user = new User({
//       username,
//       password: hashedPassword, // Store the hashed password
//       userRole,
//       type,
//       age,
//       occupation,
//       phoneNumber,
//       adminKey,
//     });

//     await mongoose.connect(
//       "mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority"
//     );

//     await user.save();
//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });

// Login Route
// Login Route
// router.post('/login', async (req, res) => {
//   try {
//     const client = await connectToMongo();
//     const db = client.db("NewSampleDatabase");
//     const collection = db.collection("users");
//     const { username, password } = req.body;
//     await mongoose.connect(
//       "mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority"
//     );
//     const user = await User.findOne({ username, password });
//     console.log(user);
    
//     if (user) {
//       res.status(200).json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error('Login failed:', error.message); // Log the specific error message
//     res.status(500).json({ error: 'Login failed' });
//   }
// });
router.post('/login', async (req, res) => {
  try {
    const client = await connectToMongo();
    const db = client.db("NewSampleDatabase");
    const collection = db.collection("users");
    const { username, password } = req.body;
    
    await mongoose.connect(
      "mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority"
    );

    const user = await User.findOne({ username });

    if (user) {
      // Compare the provided password with the hashed password from the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login failed:', error.message); // Log the specific error message
    res.status(500).json({ error: 'Login failed' });
  }
});
router.post('/verifyAdmin', async (req, res) => {
  const { adminKey } = req.body;
  console.log(adminKey);

  try {
    console.log("inside try");
    await mongoose.connect(
      "mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority"
    );
    const user = await User.findOne({ adminKey:adminKey });
    console.log(user);
    if (user) {
      res.status(200).json({ success: true, message: 'Admin verified' });
    } else {
      res.status(403).json({ success: false, message: 'Admin not verified' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
    console.log(error)
  }
});
module.exports = router;
