import { Server, Socket } from "socket.io";
import prisma from "../lib/prisma";
import { verifySocketToken } from "./auth";
import { parse } from "cookie";

type SendMessagePayload = {
  content: string;
  conversationId: number;
  clientTempId?: number;
};

type SendMessageCallback = (status: {
  success: boolean;
  messageId?: number;
}) => void;

export function initSocket(io: Server) {
  const onlineUsers = new Map<number, Set<string>>();

  // Auth middleware
  io.use((socket: Socket, next) => {
    try {
      const rawCookie = socket.handshake.headers.cookie;

      if (!rawCookie) {
        return next(new Error("Authentication error"));
      }

      const cookies = parse(rawCookie);
      const token = cookies.token;

      if (!token) {
        return next(new Error("Authentication error"));
      }

      const payload = verifySocketToken(token);

      if (!payload) {
        return next(new Error("Authentication error"));
      }

      socket.data.userId = payload.userId;
      next();
    } catch {
      next(new Error("Authentication error"));
    }
  });

  // Connection handler
  io.on("connection", (socket: Socket) => {
    const userId = Number(socket.data.userId);
    if (isNaN(userId)) {
      return socket.disconnect();
    }

    const alreadyOnline = onlineUsers.has(userId);
    let sockets = onlineUsers.get(userId);

    if (!sockets) {
      sockets = new Set<string>();
      onlineUsers.set(userId, sockets);
    }

    sockets.add(socket.id);

    const isFirstConnection = !alreadyOnline;

    // snapshot (only on connect ==> presence init per socket)
    const allOnline = Array.from(onlineUsers.keys());
    socket.emit("online_users_snapshot", {
      users: allOnline,
    });

    // notify others only when user becomes online (first socket ever)
    if (isFirstConnection) {
      io.emit("user_online", { userId });
    }

    // JOIN ROOM (with access control)
    socket.on("join_conversation", async (conversationId: number) => {
      try {
        if (typeof conversationId !== "number") return;
        const membership = await isMember(userId, conversationId);

        if (!membership) return;

        socket.join(`conversation_${conversationId}`);
      } catch (err) {
        console.error("join_conversation error:", err);
      }
    });

    // SEND MESSAGE
    socket.on(
      "send_message",
      async (data: SendMessagePayload, callback?: SendMessageCallback) => {
        if (typeof callback !== "function") return;

        if (!userId) {
          return callback({ success: false });
        }

        if (
          typeof data.content !== "string" ||
          !data.content.trim() ||
          typeof data.conversationId !== "number"
        ) {
          callback({ success: false });
          return;
        }

        try {
          const membership = await isMember(userId, data.conversationId);

          if (!membership) {
            callback({ success: false });
            return;
          }

          const message = await prisma.message.create({
            data: {
              content: data.content,
              conversationId: data.conversationId,
              senderId: userId,
            },
            include: {
              sender: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  avatar: true,
                },
              },
            },
          });

          io.to(`conversation_${data.conversationId}`).emit("receive_message", {
            ...message,
            clientTempId: data.clientTempId,
          });

          callback({ success: true, messageId: message.id });
        } catch (err) {
          console.error("send_message error:", err);
          callback({ success: false });
        }
      }
    );

    // LEAVE ROOM
    socket.on("leave_conversation", (conversationId: number) => {
      if (typeof conversationId !== "number") return;
      socket.leave(`conversation_${conversationId}`);
    });
    
    // TYPING STATUS
    socket.on("typing_status", async (data: { conversationId: number; isTyping: boolean }) => {
      try {
        if (typeof data.conversationId !== "number") return;
        
        const membership = await isMember(userId, data.conversationId);
        if (!membership) return;
        
        socket.to(`conversation_${data.conversationId}`).emit("user_typing_status", {
          userId,
          conversationId: data.conversationId,
          isTyping: data.isTyping
        });
      } catch (err) {
        console.error("typing_status error:", err);
      }
    });

    socket.on("disconnect", () => {
      const userId = Number(socket.data.userId);
      const sockets = onlineUsers.get(userId);

      if (!sockets) return;

      sockets.delete(socket.id);

      // only mark offline if no other tabs exist
      if (sockets.size === 0) {
        onlineUsers.delete(userId);
        io.emit("user_offline", { userId });
      }
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
  });

  io.engine.on("connection_error", (err) => {
    console.error("Engine error:", err);
  });
}

async function isMember(userId: number, conversationId: number) {
  return prisma.conversation.findFirst({
    where: {
      id: conversationId,
      OR: [
        { user1Id: userId },
        { user2Id: userId },
      ],
    },
  });
}
