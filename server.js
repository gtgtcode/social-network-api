const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));

mongoose.connect("mongodb://localhost:27017/socialDB");

// Route for the homepage
app.get("/", (req, res) => {
  res.send();
});

// Start the server
mongoose.set("debug", true);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
