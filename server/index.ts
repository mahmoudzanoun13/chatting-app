import "./load-env";
import { createServer } from "node:http";
import { Server } from "socket.io";
import prisma from "../lib/prisma";
import { initSocket } from "./socket";

const hostname = process.env.HOSTNAME || "localhost";
const port = Number(process.env.SOCKET_PORT) || 3001;

let httpServer: ReturnType<typeof createServer>;
let io: Server;

async function startServer() {
  httpServer = createServer();

  io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // attach socket logic
  initSocket(io);

  httpServer
    .once("error", (err) => {
      console.error("Server error:", err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Socket server running on http://${hostname}:${port}`);
    });

  // graceful shutdown
  process.on("SIGINT", async () => {
    console.log("Shutting down socket server...");

    try {
      if (io) io.close();
      if (httpServer) httpServer.close();

      await prisma.$disconnect();
    } catch (err) {
      console.error("Shutdown error:", err);
    }

    process.exit(0);
  });
}

startServer();
