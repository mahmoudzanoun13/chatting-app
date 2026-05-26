import { queryOptions } from "@tanstack/react-query";

async function fetchConversations() {
  const res = await fetch("/api/conversations", { credentials: "include" });
  const result = await res.json();
  if (!result.success) return [];
  return result.data;
}

export const conversationsQuery = queryOptions({
  queryKey: ["conversations"],
  queryFn: fetchConversations,
});
