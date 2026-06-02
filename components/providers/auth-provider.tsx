"use client";

import { useCurrentAuth } from "@/hooks/queries/auth/use-current-auth";
import SocketInitializer from "./socket-initializer";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useCurrentAuth();

  return (
    <>
      <SocketInitializer />
      {children}
    </>
  );
}
