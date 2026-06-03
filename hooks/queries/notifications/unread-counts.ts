import { queryOptions } from "@tanstack/react-query";

async function fetchUnreadCounts() {
  const res = await fetch("/api/notifications/unread-counts", {
    credentials: "include",
  });

  const result = await res.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data as Record<number, number>;
}

export const unreadCountsQuery = queryOptions({
  queryKey: ["unread-counts"],
  queryFn: fetchUnreadCounts,
  staleTime: 1000 * 60, // 1 minute
});
