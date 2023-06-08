const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 4000; // Update the port number as per your configuration

app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model("User", userSchema);

// Middleware
app.use(express.json());

// Routes

// Create a new user
app.post("/users", (req, res) => {
  const { name } = req.body;

  console.log("Received user data:", { name });

  // Create a new user document
  const newUser = new User({ name });

  // Save the user data to the database
  newUser
    .save()
    .then((user) => {
      console.log("User data saved successfully:", user);
      res.json({ userId: user._id });
    })
    .catch((error) => {
      console.error("Error saving user data:", error);
      res.status(500).json({ error: "Failed to save user data" });
    });
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (user) {
        console.log("User found:", user);
        res.json({ name: user.name });
      } else {
        console.log("User not found");
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error retrieving user:", error);
      res.status(500).json({ error: "Failed to retrieve user" });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
