"use client";

import { useCurrentAuth } from "@/hooks/queries/auth/use-current-auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useCurrentAuth();

  return children;
}
