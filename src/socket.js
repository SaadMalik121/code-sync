import { io } from "socket.io-client";

export const initiSocket = async () => {
  return io("http://localhost:5000/");
};
