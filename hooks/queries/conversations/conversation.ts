import { queryOptions } from "@tanstack/react-query";

async function fetchConversation(conversationId: number) {
  const res = await fetch(`/api/conversations/${conversationId}`, { credentials: "include" });
  const result = await res.json();
  if (!result.success) return null;
  return result.data;
}

export const conversationQuery = (conversationId: number) =>
  queryOptions({
    queryKey: ["conversation", conversationId],
    queryFn: () => fetchConversation(conversationId),
    enabled: !!conversationId,
  });
