import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/hooks/socket/use-socket";
import { messagesQuery } from "@/hooks/queries/messages/messages";
import { MessageWithSender } from "../utils/message-utils";
import { UserModel } from "@/generated/prisma/models/User";

export function useConversationSocket(
  conversationId: number | string | undefined,
  user: UserModel | undefined
) {
  const queryClient = useQueryClient();
  const socket = useSocket(conversationId ? Number(conversationId) : undefined);

  useEffect(() => {
    if (!socket || !user || !conversationId) return;

    const handleIncomingMessage = (msg: MessageWithSender & { clientTempId?: number }) => {
      queryClient.setQueryData(
        messagesQuery(Number(conversationId)).queryKey,
        (old: MessageWithSender[] = []) => {
          // 1. Check if we already have this message by DB ID
          const existsById = old.some((m) => m.id === msg.id);
          if (existsById) return old;

          // 2. Check if this is a broadcast of a message we sent optimistically
          if (msg.clientTempId) {
            const tempIndex = old.findIndex((m) => m.id === msg.clientTempId);
            if (tempIndex !== -1) {
              // Replace optimistic message with real one
              const newMessages = [...old];
              newMessages[tempIndex] = msg;
              return newMessages;
            }
          }

          // 3. Add new message to list
          return [...old, msg];
        }
      );
    };

    socket.on("receive_message", handleIncomingMessage);

    return () => {
      socket.off("receive_message", handleIncomingMessage);
    };
  }, [socket, user, conversationId, queryClient]);

  return socket;
}
