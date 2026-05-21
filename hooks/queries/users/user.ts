import { queryOptions } from "@tanstack/react-query";

async function fetchUser(id: string | number) {
  const res = await fetch(`/api/users/${id}`, {
    credentials: "include",
  });

  const result = await res.json();

  if (!result.success) {
    return null;
  }

  return result.data;
}

export const userQuery = (id?: string | number) =>
  queryOptions({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id!),
    enabled: !!id,
  });
  