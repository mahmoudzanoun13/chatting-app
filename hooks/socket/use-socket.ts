import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket-client";

export function useSocket(conversationId?: number) {
  const [socket] = useState(() => getSocket());

  useEffect(() => {
    const s = socket;
    if (!conversationId) return;

    const join = () => {
      console.log(`[Socket] Joining conversation: ${conversationId}`);
      s.emit("join_conversation", conversationId);
    };

    const leave = () => {
      console.log(`[Socket] Leaving conversation: ${conversationId}`);
      s.emit("leave_conversation", conversationId);
    };

    if (s.connected) {
      join();
    } else {
      s.once("connect", join);
    }

    return () => {
      leave();
      s.off("connect", join); // Clean up the 'once' listener if it hasn't fired
    };
  }, [conversationId, socket]);

  return socket;
}
