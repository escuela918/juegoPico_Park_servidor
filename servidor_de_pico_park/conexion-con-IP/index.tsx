const os = require("os");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// obtener IP local
function getIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
}

const ip = getIP();
console.log("IP:", ip);

// conexión de clientes
io.on("connection", (socket) => {
  console.log("Celular conectado:", socket.id);

  socket.on("mover", (data) => {
    console.log("Movimiento:", data);
    io.emit("actualizarJugador", data);
  });
});

server.listen(3000, () => {
  console.log(`Servidor en http://${ip}:3000`);
});