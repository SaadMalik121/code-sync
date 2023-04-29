const express = require("express");
const app = express();
const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");
// // Enable CORS for all routes
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const userSocketMap = {};

function getAllConnectedClients(roomId) {
  //Map
  return Array.from(io.sockets.adapter.rooms.get(roomId)).map((socketId) => {
    return {
      socketId,
      userName: userSocketMap[socketId],
    };
  });
}
io.on("connection", (socket) => {
  console.log("SocketConnected", socket.id);

  socket.on("join", ({ userName, roomId }) => {
    console.log("joined");
    console.log({ userName, roomId });
    userSocketMap[socket.id] = userName;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);
    console.log(clients);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        userName,
        socketId,
      });
    });

    // socket.emit("connected", { status: "socket connected" });

    socket.on("disconnecting", () => {
      const rooms = [...socket.rooms];
      console.log("rooms");
      console.log(rooms);

      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        userName: userSocketMap[socket.id],
      });
      delete userSocketMap[socket.id];
      socket.leave();
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("listening on port", PORT));
