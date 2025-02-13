const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express ();
app.use(multer().none());
app.use(express.json()); //This line of code allows API to handle JSON requests
app.use(cors()); //Enables cors

app.get('/',(req, res) => { // the '/' is like a receptionist at a front desk
    res.send("Benchmark API is running...");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

mongoose.connect('mongodb+srv://Sportsmorebetter:I19O4xTwQWlLdO6A@cluster0.wsttk.mongodb.net/rp_benchmark?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// The important thing is to learn what needs to be connected and where the documentation is
// use mozilla developer more
// MOST IMPORTANT: functions, variables, etc.
// Get familiar with the backend before moving one to external training programs