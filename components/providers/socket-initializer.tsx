"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket-client";
import { useCurrentAuth } from "@/hooks/queries/auth/use-current-auth";
import { useNotificationStore } from "@/stores/notification-store";
import { useQuery } from "@tanstack/react-query";
import { unreadCountsQuery } from "@/hooks/queries/notifications/unread-counts";

export default function SocketInitializer() {
  const { data: user } = useCurrentAuth();
  const setBulkUnread = useNotificationStore((state) => state.setBulkUnread);
  const totalUnread = useNotificationStore((state) => state.getTotalUnread());

  let pathname;
  if (typeof window !== "undefined") {
    pathname = window.location.pathname;
  }
  const locale = pathname?.split("/")[1];

  // Fetch initial unread counts via React Query
  const { data: counts } = useQuery({
    ...unreadCountsQuery,
    enabled: !!user,
  });

  useEffect(() => {
    if (user) {
      getSocket();
    }
  }, [user]);

  // Sync React Query data to Zustand store for real-time socket updates
  useEffect(() => {
    if (counts) {
      setBulkUnread(counts);
    }
  }, [counts, setBulkUnread]);

  // Update Tab Title with unread count
  useEffect(() => {
    const baseTitle = locale === "en"
      ? "ChattingApp - Modern Messaging Platform"
      : "ChattingApp - منصة مراسلة حديثة";
    document.title = totalUnread > 0
      ? `(${totalUnread}) ${baseTitle}`
      : baseTitle;
  }, [totalUnread, locale]);

  return null;
}
