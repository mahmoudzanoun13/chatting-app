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

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: meQuery.queryKey });
    },
  });
}
