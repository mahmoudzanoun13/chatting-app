import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meQuery } from "@/hooks/queries/auth/me";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    },

    onSuccess: () => {
      // Set me to null immediately to mark as logged out, 
      // but don't clear() yet to avoid refetching on the current page.
      queryClient.setQueryData(meQuery.queryKey, null);
    },
  });
}
