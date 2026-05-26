import { useQueryClient } from "@tanstack/react-query";
import { messagesQuery } from "@/hooks/queries/messages/messages";
import { MessageWithSender, createOptimisticMessage } from "../utils/message-utils";
import { UserModel } from "@/generated/prisma/models/User";
import { Socket } from "socket.io-client";

export function useSendMessage(
  conversationId: number | string | undefined,
  user: UserModel | undefined,
  socket: Socket | null
) {
  const queryClient = useQueryClient();

  const handleSend = (text: string) => {
    if (!conversationId || !user || !socket) return;

    const tempId = -Date.now();

    const optimisticMessage = createOptimisticMessage({
      text,
      conversationId,
      user,
      tempId,
    });

    // 1. Optimistic update
    queryClient.setQueryData(
      messagesQuery(Number(conversationId)).queryKey,
      (old: MessageWithSender[] = []) => [...old, optimisticMessage]
    );

    // 2. Emit socket event
    socket.emit(
      "send_message",
      {
        content: text,
        conversationId: Number(conversationId),
        clientTempId: tempId,
      },
      (res: { success: boolean; messageId?: number }) => {
        if (!res.success) {
          // 3. Rollback on failure
          queryClient.setQueryData(
            messagesQuery(Number(conversationId)).queryKey,
            (old: MessageWithSender[] = []) =>
              old.filter((m) => m.id !== tempId)
          );
        }
      }
    );
  };

  return { handleSend };
}
