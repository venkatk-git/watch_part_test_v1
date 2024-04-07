const express = require("express");
const app = express();
app.use(express.static("public"));
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
