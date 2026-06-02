"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket-client";
import { useCurrentAuth } from "@/hooks/queries/auth/use-current-auth";

export default function SocketInitializer() {
  const { data: user } = useCurrentAuth();

  useEffect(() => {
    if (user) {
      getSocket();
    }
  }, [user]);

  return null;
}
