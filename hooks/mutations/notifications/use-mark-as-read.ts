import { unreadCountsQuery } from "@/hooks/queries/notifications/unread-counts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function markAsRead(conversationId: number) {
  const res = await fetch("/api/messages/mark-as-read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ conversationId }),
  });

  const result = await res.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      // Invalidate unread counts to keep UI in sync
      queryClient.invalidateQueries({ queryKey: unreadCountsQuery.queryKey });
    },
  });
}
