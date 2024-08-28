// Import express
const express = require("express");

// Import library to parse web response from user
const bodyParser = require("body-parser");

// Use randomBytes to create ramdom numbers for post id
const { randomBytes } = require("crypto");

// Import cors to connect with react app
const cors = require("cors");

// Import axios for event bus
const axios = require("axios");

// Create express application
const app = express();

// Make the express app use the bodyParser and cors
app.use(bodyParser.json());
app.use(cors());

// Store data in memory
const posts = {};

// Create service to Get all posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

// Create service to Post (add) a new post
app.post("/posts", async (req, res) => {
  // Create a random id of 4 digits hex number
  const id = randomBytes(4).toString("hex");
  // Get the title from user's response
  const { title } = req.body;

  // Add the new post to the posts repo
  posts[id] = {
    id,
    title,
  };

  // Emit event to event bus
  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  // Send back success code and the content
  res.status(201).send(posts[id]);
});

// Receive event from event bus
app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);

  res.send({});
});

// Set the server to listen on port 4000
app.listen(4000, () => {
  console.log("Listen on 4000");
});
