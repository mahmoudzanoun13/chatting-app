"use client";

import { useQuery } from "@tanstack/react-query";
import { meQuery } from "@/hooks/queries/auth/me";
import { Spinner } from "@/components/ui/spinner";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useQuery(meQuery);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return children;
}
