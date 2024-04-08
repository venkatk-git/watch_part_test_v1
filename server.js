const express = require("express");
const app = express();
const path = require("path");
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/public")));
const expressServer = app.listen(3000);

const { Server } = require("socket.io");

const io = new Server(expressServer, {
  cors: "http://localhost:3000",
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
