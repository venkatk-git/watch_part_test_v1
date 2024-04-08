const path = require("path");
const __dirname1 = path.resolve();
const http = require("http");
const express = require("express");
const app = express();
app.use(express.static(path.join(__dirname1, "/public")));
const socketio = require("socket.io");
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: (_req, callback) => {
      callback(null, true);
    },
    credentials: true,
  },
  allowEIO3: true,
  addTrailingSlash: false,
});

io.on("connect", (socket) => {
  console.log(socket.id);
  socket.emit("serverConnected", "Connection successfully made.");
  socket.on("startPlaying", () => {
    io.emit("startVideo");
  });
  socket.on("stateChange", (res) => {
    io.emit("changeTheState", res);
  });
});

io.engine.on("connection_error", (err) => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});

server.listen(3000);
