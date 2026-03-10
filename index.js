const express = require("express");
const cors = require("cors");
const { AccessToken } = require("livekit-server-sdk");

// Create and configure the Express app
const app = express();
app.use(cors({ origin: "*" })); // Enable CORS
app.use(express.json());

const API_KEY = "hamaralabskey";
const API_SECRET = "hamaralabssecret";

app.get("/token", async (req, res) => {

  const identity = req.query.identity || "viewer";
  const room = req.query.room || "webcamroom";

  const at = new AccessToken(API_KEY, API_SECRET, {
    identity: identity
  });

  at.addGrant({
    roomJoin: true,
    room: room,
    canPublish: false,
    canSubscribe: true
  });

  res.send(await at.toJwt());
});

app.get("/camera-token", async (req, res) => {

  const at = new AccessToken(API_KEY, API_SECRET, {
    identity: "camera"
  });

  at.addGrant({
    roomJoin: true,
    room: "webcamroom",
    canPublish: true,
    canSubscribe: false
  });

  res.send(await at.toJwt());
});

app.listen(3000, () => {
  console.log("Token server running");
});
