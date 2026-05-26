import { useQuery } from "@tanstack/react-query";
import { conversationByUserQuery } from "@/hooks/queries/conversations/by-user";
import { messagesQuery } from "@/hooks/queries/messages/messages";
import { useCurrentAuth } from "@/hooks/queries/auth/use-current-auth";
import { useMemo } from "react";
import { getSenderType, MessageWithSender } from "../utils/message-utils";

export function useConversationMessages(userId: string) {
  const { data: user } = useCurrentAuth();

  const { data: conversationId, isLoading: isConvLoading } = useQuery(
    conversationByUserQuery(userId)
  );

  const { data: messages = [], isLoading: isMsgLoading } = useQuery<MessageWithSender[]>(
    messagesQuery(Number(conversationId))
  );

  const typedMessages = useMemo(() => {
    if (!user) return [];
    return messages.map((msg) => ({
      ...msg,
      senderType: getSenderType(msg.sender.id, user.id),
    }));
  }, [messages, user]);

  return {
    user,
    conversationId,
    messages,
    typedMessages,
    isLoading: isConvLoading || isMsgLoading,
  };
}
