import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { MessageWithSender, createOptimisticMessage } from "../utils/message-utils";
import { UserModel } from "@/generated/prisma/models/User";
import { infiniteMessagesOptions } from "@/hooks/queries/messages/messages";
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
      conversationId: Number(conversationId),
      user,
      tempId,
    });

    const queryKey = infiniteMessagesOptions(Number(conversationId)).queryKey;

    // 1. Optimistic update
    queryClient.setQueryData<InfiniteData<MessageWithSender[]>>(
      queryKey,
      (old) => {
        if (!old) return old;
        const newPages = [...old.pages];
        newPages[0] = [...newPages[0], optimisticMessage];
        return { ...old, pages: newPages };
      }
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
          queryClient.setQueryData<InfiniteData<MessageWithSender[]>>(
            queryKey,
            (old) => {
              if (!old) return old;
              const newPages = old.pages.map((page) =>
                page.filter((m) => m.id !== tempId)
              );
              return { ...old, pages: newPages };
            }
          );
        }
      }
    );
  };

  return { handleSend };
}
