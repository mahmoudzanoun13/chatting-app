import { useEffect } from "react";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useSocket } from "@/hooks/socket/use-socket";
import { infiniteMessagesOptions } from "@/hooks/queries/messages/messages";
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
      const queryKey = infiniteMessagesOptions(Number(conversationId)).queryKey;
      queryClient.setQueryData<InfiniteData<MessageWithSender[]>>(
        queryKey,
        (old) => {
          if (!old) return old;

          // 1. Check if we already have this message in any page
          const alreadyExists = old.pages.some((page) =>
            page.some((m) => m.id === msg.id)
          );
          if (alreadyExists) return old;

          const newPages = [...old.pages];
          const firstPage = [...newPages[0]];

          // 2. Check if this is a broadcast of an optimistic message
          if (msg.clientTempId) {
            const tempIndex = firstPage.findIndex((m) => m.id === msg.clientTempId);
            if (tempIndex !== -1) {
              // Replace optimistic message with real one
              firstPage[tempIndex] = msg;
              newPages[0] = firstPage;
              return { ...old, pages: newPages };
            }
          }

          // 3. Append to the first page (latest messages)
          firstPage.push(msg);
          newPages[0] = firstPage;
          return { ...old, pages: newPages };
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
