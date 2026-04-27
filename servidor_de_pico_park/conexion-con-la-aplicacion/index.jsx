import { io } from "socket.io-client";

export const crearSocket = (ip) => {
  return io(`http://${ip}:3000`);
};