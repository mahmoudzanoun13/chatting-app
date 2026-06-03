import type { MessageWithSender } from "@/components/chat/messages/messages-list";

export async function fetchMessages(conversationId: number, page: number = 1, limit: number = 20): Promise<MessageWithSender[]> {
  const res = await fetch(`/api/conversations/${conversationId}/messages?limit=${limit}&page=${page}`, {
    credentials: "include",
  });
  const result = await res.json();
  if (!result.success) return [];
  return result.data as MessageWithSender[];
}


export const infiniteMessagesOptions = (conversationId: number) => ({
  queryKey: ["messages", conversationId],
  queryFn: ({ pageParam = 1 }) => fetchMessages(conversationId, Number(pageParam)),
  initialPageParam: 1,
  getNextPageParam: (lastPage: MessageWithSender[], allPages: MessageWithSender[][]) => {
    return lastPage.length === 20 ? allPages.length + 1 : undefined;
  },
  enabled: !!conversationId,
});
