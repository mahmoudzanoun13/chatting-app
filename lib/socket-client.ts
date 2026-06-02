import { io, Socket } from "socket.io-client";
import { initPresenceListeners } from "./presence-listeners";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    // Initialize presence listeners
    initPresenceListeners();

    socket.on("connect", () => {
      console.log("Global Socket Connected");
    });

    socket.on("disconnect", () => {
      console.log("Global Socket Disconnected");
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
