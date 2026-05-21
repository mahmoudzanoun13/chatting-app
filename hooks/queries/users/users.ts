import { queryOptions } from "@tanstack/react-query";

async function fetchUsers() {
  const res = await fetch("/api/users", {
    credentials: "include",
  });

  const result = await res.json();

  if (!result.success) {
    return null;
  }

  return result.data;
}

export const usersQuery = queryOptions({
  queryKey: ["users"],
  queryFn: fetchUsers,
});
