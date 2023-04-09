const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/socialDB");

// Route for the homepage
app.get("/", (req, res) => {
  res.send(JSON.stringify(mongoose));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
