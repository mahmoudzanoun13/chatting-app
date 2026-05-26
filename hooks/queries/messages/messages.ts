import { queryOptions } from "@tanstack/react-query";
import type { MessageWithSender } from "@/components/chat/messages/messages-list";

async function fetchMessages(conversationId: number, page: number = 1, limit: number = 20): Promise<MessageWithSender[]> {
  const res = await fetch(`/api/conversations/${conversationId}/messages?limit=${limit}&page=${page}`, {
    credentials: "include",
  });
  const result = await res.json();
  if (!result.success) return [];
  return result.data as MessageWithSender[];
}

export const messagesQuery = (conversationId: number) =>
  queryOptions<MessageWithSender[]>({
    queryKey: ["messages", conversationId],
    queryFn: () => fetchMessages(conversationId),
    enabled: !!conversationId,
  });
