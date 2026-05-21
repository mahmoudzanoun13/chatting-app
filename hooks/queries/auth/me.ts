import { queryOptions } from "@tanstack/react-query";

async function fetchMe() {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });

  const result = await res.json();

  if (!result.success) {
    return null;
  }

  return result.data;
}

export const meQuery = queryOptions({
  queryKey: ["auth", "me"],
  queryFn: fetchMe,
});
