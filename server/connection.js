// const { MongoClient } = require("mongodb");

// const uri = "mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/?retryWrites=true&w=majority";

// (async () => {
//   try {
//     const client = await MongoClient.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
//     const db = client.db(); // Get the database object

//     // Successful connection
//     console.log("MongoDbConnectionSuccessful");

//     // Export the MongoClient for later use
//     module.exports = client;

//     // Handle connection errors
//     client.on("error", () => {
//       console.log("MongoDbConnectionFailed");
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// })();
// server.js
const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/?retryWrites=true&w=majority'; // Replace this with your MongoDB connection string

async function connectToMongo() {
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true , serverSelectionTimeoutMS: 5000,  maxPoolSize: 50});
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err); 
    throw err;
  }
}

module.exports = { connectToMongo}

