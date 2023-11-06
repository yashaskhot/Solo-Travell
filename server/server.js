const express = require("express");
const app = express();
const cors = require('cors');
const { connectToMongo } = require("./connection");
const mongoose = require("mongoose");
const roomsroute = require('./routes/roomroutes');
const bookingsRoute = require('./routes/bookingsroute');
const addroomRoutes = require("./routes/addroomRoutes");
const authRoutes = require('./routes/authRoutes');
const User = require('./models/user'); // Import your User model
const bookingsRouter = require('./routes/bookingdetails'); // Adjust the path to your router file
const Booking = require('./models/booking'); // Import the Booking model
const Room= require('./models/rooms');



// ... rest of your code


app.use(cors());
app.use(express.json());
// app.get('/api/room', async (req, res) => {
//     try { 
//         const client = await connectToMongo();
//         const db = client.db('NewSampleDatabase');
//         const collection = db.collection('Booking');
        
//         // Use req.body.name to query the database
//         const roomName = req.query.roomName;
//         const response = await collection.findOne({ room: roomName });
//         res.send(response);
//       } catch (error) {
//          console.log(error);
//          res.status(500).send("Internal Server Error");
//       }
//   });
app.get('/api/users/:username', async (req, res) => {
    const username = req.params.username;
    console.log(username)
  
    try {
        await mongoose.connect(
            "mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority"
          );
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      console.log('User Details:', user); // Add this line for debugging
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/api/roomsnew/:name', async (req, res) => {
  const roomName = req.params.name;
  console.log(roomName);
  try {
    await mongoose.connect(
      "mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority"
    );
    console.log("connected");
    const room = await Booking.find({ 'userDetails.username': roomName });
    console.log(room);
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// app.get('/api/room-details/:roomid/:adminKey', async (req, res) => {
//   try {
//     await mongoose.connect("mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority");
//     console.log("connected");
    
//     const { roomid, adminKey } = req.params;
//     console.log(roomid);
//     console.log(adminKey);

//     // Use Mongoose's findOne method to find a single document that matches the conditions
//     const room = await Booking.find({ room: adminKey });
//     console.log(room);
    
//     if (room) {
//       res.json([room]);
//     } else {
//       res.status(404).json({ error: 'Room not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.get('/api/room-details/:roomid/:adminKey', async (req, res) => {
  try {
    // Connect to your MongoDB database
    await mongoose.connect("mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority");
    console.log("connected");
    
    const { roomid, adminKey } = req.params;
    console.log(roomid);
    console.log(adminKey);

    // Use Mongoose's findOne method to find a single document in the "rooms" collection
    const roomnew = await Room.findOne({ adminKey: adminKey });
    console.log(roomnew);

    if (roomnew) {
      const room = await Booking.find({ room: roomid });
      console.log(room);
      res.json([room]);
    } else {
      // If no room with the adminKey is found, return a 404 error
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.use('/api/rooms', roomsroute);
// app.use('/api/bookings',bookingsRoute);
app.use('/api/bookings', bookingsRoute); // Use the route
 // Adjust the path as needed
app.use("/api/addrooms", addroomRoutes);
app.use('/api', authRoutes);
app.use('/api/bookingdetails', bookingsRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node server running on port ${port}`));
