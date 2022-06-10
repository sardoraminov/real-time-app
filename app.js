const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("client"));

io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", { msg: data.msg, userId: socket.id });
  });
  console.log("new connection");
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
