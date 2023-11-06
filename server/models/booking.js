// const mongoose = require('mongoose');

// const bookingschema =mongoose.Schema({
//     room : {
//         type:String,
//         required:true
//     },
//     roomid : {
//         type:String,
//         required:true
//     },
//     fromdate : {
//         type:String,
//         required:true
//     },
//     todate : {
//         type:String,
//         required:true
//     },
//     totalamount : {
//         type:String,
//         required:true
//     },
//     totaldays : {
//         type:String,
//         required:true
//     },
//     transactionid : {
//         type:String,
//         required:true
//     },
//     status : {
//         type:String,
//         required:true,
//         default:'booked'
//     },
//     timestamps : {
//         type:String,
//         required:true
//     },

// })
// const model =mongoose.model('bookings',bookingschema);
// module.exports = model;

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  room: String,
  roomid:String,
  roomtype:String,
  selectedCheckInDate: String,
  selectedCheckoutDate: String,
  rentPerDay: Number,
  totalamount: Number,
  totaldays: Number,
  userDetails:Object,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;