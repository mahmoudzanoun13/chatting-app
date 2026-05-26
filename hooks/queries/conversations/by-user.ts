import { queryOptions } from "@tanstack/react-query";

async function fetchConversationId(userId: string) {
  const res = await fetch(`/api/conversations/by-user/${userId}`, {
    credentials: "include",
  });

  const result = await res.json();
  if (!result.success) {
    return null;
  }

  return result.data.conversationId;
}

export const conversationByUserQuery = (userId: string) =>
  queryOptions({
    queryKey: ["conversationByUser", userId],
    queryFn: () => fetchConversationId(userId),
    enabled: !!userId,
  });
