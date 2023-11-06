const express = require("express");
const Room = require("../models/rooms");
const router = express.Router()
const { connectToMongo } = require("../connection");
const mongoose = require("mongoose");
const multer = require("multer");

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

// Define the API route for creating a room with file uploads
router.post("/create", upload.single("image"), async (req, res) => {
    try {
      // Connect to the MongoDB database
      const client = await connectToMongo();
      const db = client.db("NewSampleDatabase");
      const collection = db.collection("rooms");
  
      // Extract room data, facilities, and image from the request body
      const {
        name,
        MaxCount,
        Phonenumber,
        Rentperday,
        Type,
        Description,
        facilities, // Updated to accept an array
        imageurls,
        Latitude, // Added Latitude field
        Longitude, // Added Longitude field
        adminKey,
        Roomid,
      } = req.body;
  
      // Access the uploaded image from req.file
      const image = req.file;
  
      // Create a new room document using the Room model
      const newRoom = new Room({
        name,
        MaxCount,
        Phonenumber,
        Rentperday,
        Type,
        Description,
        facilities, // Include the facilities array
        imageurls,
        Latitude, // Include Latitude field
        Longitude, // Include Longitude field
        adminKey,
        Roomid,
        
      });
  
      // If an image was uploaded, set it in the room document
      if (image) {
        newRoom.image = {
          data: image.buffer,
          contentType: image.mimetype,
        };
      }
  
      // Save the room to the database
      await mongoose.connect(
        "mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority"
      );
      await newRoom.save();
  
      console.log("Room created successfully");
      res
        .status(201)
        .json({ message: "Room created successfully", room: newRoom });
    } catch (error) {
      console.error("Error creating room:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  module.exports = router;