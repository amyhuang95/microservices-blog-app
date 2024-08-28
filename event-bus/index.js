const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// Set up the service
const app = express();
app.use(bodyParser.json());

// Store events
const events = [];

// Set up event handler
app.post("/events", (req, res) => {
  const event = req.body;

  // Add events to the array
  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  // axios.post("http://localhost:4001/events", event).catch((err) => {
  //   console.log(err.message);
  // });
  // axios.post("http://localhost:4002/events", event).catch((err) => {
  //   console.log(err.message);
  // });
  // axios.post("http://localhost:4003/events", event).catch((err) => {
  //   console.log(err.message);
  // });

  res.send({ status: "OK" });
});

// Service to send all events
app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
