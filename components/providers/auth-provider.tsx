"use client";

import { useQuery } from "@tanstack/react-query";
import { meQuery } from "@/hooks/queries/auth/me";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useQuery(meQuery);
  return children;
}
