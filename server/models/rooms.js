const mongoose = require('mongoose');

// const roomSchema = mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },
//         MaxCount: {
//             type: String,
//             required: true
//         },
//         Phonenumber: {
//             type: String,
//             required: true
//         },
//         Rentperday: {
//             type: String,
//             required: true
//         },
//         imageurls: [],
//         currentbookings: [],
//         Type: {
//             type: String,
//             required: true
//         },
//         Description: { // Corrected typo: "Decription" to "Description"
//             type: String,
//             required: true
//         }
//     },
//     {
//         timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
//     }
// );

// const room = mongoose.model('rooms', roomSchema);
// module.exports = room;
// const mongoose = require('mongoose');

// const roomSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     MaxCount: {
//       type: String,
//       required: true,
//     },
//     Phonenumber: {
//       type: String,
//       required: true,
//     },
//     Rentperday: {
//       type: String,
//       required: true,
//     },
//     imageurls: [{
//       type: String,
//     }],
//     currentbookings: [],
//     Type: {
//       type: String,
//       required: true,
//     },
//     Description: {
//       type: String,
//       required: true,
//     },
//     facilities: [], // Array of strings for facilities
//     // Add more features as needed
//   },
//   {
//     timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
//   }
// );

// const room = mongoose.model('rooms', roomSchema);
// module.exports = room;
const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    Roomid: {
      type: String,
      required: true,
    },
    MaxCount: {
      type: String,
      required: true,
    },
    Phonenumber: {
      type: String,
      required: true,
    },
    Rentperday: {
      type: String,
      required: true,
    },
    imageurls: [{
      type: String,
    }],
    currentbookings: [],
    Type: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    facilities: [], // Array of strings for facilities
    Latitude: { // Add latitude field
      type: Number, // Assuming latitude is a number
      required: true,
    },
    Longitude: { // Add longitude field
      type: Number, // Assuming longitude is a number
      required: true,
    },
    adminKey: {
      type: String,
      required: true,
      default: "123", // Replace with your desired default value
    },
    // Add more features as needed
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const room = mongoose.model('rooms', roomSchema);
module.exports = room;
