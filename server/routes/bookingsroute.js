// const express =require('express')
// const router = express.Router()
// const Room= require('../models/booking');
// const {connectToMongo} = require("../connection");
// const mongoose = require("mongoose"); // Require Mongoose

// router.post("/bookroom", async (req, res) => {
//     const{
//         room,
//         userid,
//         fromdate,
//         todate,
//         totalamount,
//         totaldays
//     }=req.body
//   try { 
//     const client = await connectToMongo();
//     const db = client.db('NewSampleDatabase');
//     const collection = db.collection('bookings');
    
//     const newbooking = new Booking({
//             room : room.name,
//             roomid:room._id,
//             userid,
//             fromdate,
//             todate,
//             totalamount,
//             totaldays,
//             transactionId:'1234'
//     })

//     const booking = newbooking.save()

//   } catch (error) {
//      console.log(error);
//      res.status(500).send("Internal Server Error");
//   }
// });
// module.exports=router;
// 
const express = require('express')
const router = express.Router()
const Booking = require('../models/booking'); // Change 'Room' to 'Booking'
const { connectToMongo } = require("../connection");
const mongoose = require("mongoose");
const stripe=require("stripe")("sk_test_51NjEVWSIqBmCrKtAgHUelRrkU4Nz3xXRGLtw8oNCPlF6SMpn8EaUJaxjS8WJ7TGZvIDtXJZLizL8K55lJLz2m8Bt00Dp0XYl1d",{ apiVersion: '2023-08-16' });
const { v4: uuidv4 } = require('uuid');
const Room= require('../models/rooms');

// router.post("/bookroom", async (req, res) => {
//     const {
//         room,
//         userid,
//         fromdate,
//         todate,
//         totalamount,
//         totaldays
//     } = req.body
//     try {
//         const client = await connectToMongo();
//         const db = client.db('NewSampleDatabase');
//         const collection = db.collection('bookings');

//         const newbooking = new Booking({
//             room: room.name,
//             roomid: room._id,
//             userid,
//             fromdate,
//             todate,
//             totalamount,
//             totaldays,
//             transactionId: '1234'
//         })

//         const booking = await newbooking.save(); // Add 'await' here

//         res.status(200).json(booking); // Respond with the saved booking
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// module.exports = router; // Assuming 'Booking' is your Mongoose model

router.post('/createbooking', async (req, res) => {
  try {
    // Debugging: Log the request body to inspect the token
    console.log('Request Body:', req.body);

    // Get the payment details from the request body
    const { totalamount, token, room,selectedCheckInDate, selectedCheckoutDate,userDetails } = req.body;

    // Create a Stripe customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // Create a payment charge
    const payment = await stripe.paymentIntents.create({
      customer: customer.id,
      amount: totalamount*100, 
      currency: 'inr', 
      description: 'Rails Stripe PaymentIntent',
      receipt_email: customer.email, // Use customer's email here
    });

    // Check if the payment was successful
    if (payment) {
      const {
        room,
        selectedCheckInDate,
        selectedCheckoutDate,
        rentPerDay,
        totalamount,
        totaldays,
        token,
        userDetails,
      } = req.body;
      console.log(req.body);
      // Create a new booking document using the Booking model
      const newBooking = new Booking({
            room : room.name,
            roomid : room.Roomid,
            roomtype : room.type,
            selectedCheckInDate,
            selectedCheckoutDate,
            rentPerDay,
            totalamount,
            totaldays,
            userDetails: {  // Include user details here
              username: userDetails.username,
              age: userDetails.age,
              occupation: userDetails.occupation,
            },
      });
      console.log(newBooking);

      // Save the booking to the database
      mongoose.connect('mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority');
      await newBooking.save();
      const temproom = await Room.findOne({ name: room.name });

      if (!temproom) {
        // Handle the case where the room doesn't exist
        return res.status(400).json({ error: 'Room not found' });
      }

      // Add booking information to the room's currentbookings array
      const newBookingId = newBooking._id;
      temproom.currentbookings.push({
        bookingid: newBookingId,
        fromdate: selectedCheckInDate,
        todate: selectedCheckoutDate,
      });

      // Save the updated room data back to the database
await mongoose.connect("mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/NewSampleDatabase?retryWrites=true&w=majority");
      await temproom.save();

      res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } else {
      res.status(400).json({ error: 'Payment failed' });
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
