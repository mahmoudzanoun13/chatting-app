import { useQuery } from "@tanstack/react-query";
import { meQuery } from "./me";
import { usePathname } from "next/navigation";

export function useCurrentAuth() {
  const pathname = usePathname();

  const isAuthPage =
    pathname?.includes("/login") ||
    pathname?.includes("/signup") ||
    pathname?.includes("/forgot-password");

  return useQuery({
    ...meQuery,
    enabled: !isAuthPage,
  });
}
