const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb'); // Import the MongoClient from the MongoDB Node.js driver

const uri = 'mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority';

// API endpoint to fetch room details by room name
router.get('/api/bookingdetails/:roomName', async (req, res) => {
  const { roomName } = req.params;

  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(); // Connect to the MongoDB server

    const db = client.db("NewSampleDatabase");
    const collection = db.collection("bookings");

    const room = await collection.findOne({ room: roomName });

    if (room) {
      res.json(room);
    } else {
      res.status(404).send('Room not found');
    }

    client.close(); // Close the database connection when done
  } catch (error) {
    console.error('Error fetching room details:', error);
    res.status(500).send('Error fetching room details');
  }
});

module.exports = router;
