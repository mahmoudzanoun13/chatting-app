"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const initialized = useAuthStore((state) => state.initialized);

  useEffect(() => {
    if (!initialized) {
      fetchMe();
    }
  }, [initialized, fetchMe]);

  return children;
}
