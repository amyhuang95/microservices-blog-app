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

// Store comments in memory {id: [{commentId: content}, ...]}
const commentsByPostId = {};

// Create service to get all comments associated with a post id
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id]) || [];
});

// Create service to add a comment to a post id
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  // Get the comments in this post, return an empty array if there was no comment
  const comments = commentsByPostId[req.params.id] || [];

  // Save the new comments into comments array, set status as pending
  comments.push({ id: commentId, content, status: "pending" });

  // Update the repo for all comments
  commentsByPostId[req.params.id] = comments;

  // Emit event to event bus
  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  // Send back all comments for the post
  res.status(201).send(comments);
});

// Receive event from event bus
app.post("/events", async (req, res) => {
  console.log("Event Received", req.body.type);

  const { type, data } = req.body;

  // Update status for moderated comments
  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    // Emit event to event bus
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }

  res.send({});
});

// Set the server to listen on port 4001
app.listen(4001, () => {
  console.log("Listen on 4001");
});
