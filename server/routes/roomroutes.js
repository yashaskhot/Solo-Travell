const express =require('express')
const router = express.Router()
const Room= require('../models/rooms');
const {connectToMongo} = require("../connection");
const mongoose = require("mongoose"); // Require Mongoose
router.get("/getallroom", async (req, res) => {
  try { 
    const client = await connectToMongo();
    const db = client.db('NewSampleDatabase');
    const collection = db.collection('rooms');
    
      const room = await collection.find({}).toArray();
      res.send(room);
      
  } catch (error) {
     console.log(error);
  }
});

// router.post('/getallroombyid', async (req, res) => {
//   const roomid = req.query.roomid; // Access roomid from query parameters using req.query

//   try {
//     const client = await connectToMongo();
//     const db = client.db('NewSampleDatabase');
//     const collection = db.collection('rooms');
    
//     // Correctly create an ObjectId using the mongoose.Types.ObjectId constructor
//     const objectIdRoomId = new mongoose.Types.ObjectId(roomid);
    
//     const room = await collection.findOne({ _id: objectIdRoomId });
//     res.send(room);
//     console.log(room);
//     client.close();
//   } catch (err) {
//     console.error('Error fetching data from MongoDB:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
router.post("/getallroombyid", async (req, res) => {
  try { 
    const client = await connectToMongo();
    const db = client.db('NewSampleDatabase');
    const collection = db.collection('rooms');
    
    // Use req.body.name to query the database
    const response = await collection.findOne({ name: req.body.name });
    res.send(response);
  } catch (error) {
     console.log(error);
     res.status(500).send("Internal Server Error");
  }
});
router.post("/findroombyid", async (req, res) => {
  try { 
    const client = await connectToMongo();
    const db = client.db('NewSampleDatabase');
    const collection = db.collection('bookings');
    
    // Use req.body.id to query the database
    const response = await collection.findOne({ room: req.body.id });
    
    if (response) {
      res.send(response);
    } else {
      res.status(404).send("Room not found");
    }
  } catch (error) {
     console.error(error);
     res.status(500).send("Internal Server Error");
  }
});
module.exports=router;