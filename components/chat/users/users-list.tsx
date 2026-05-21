"use client";

import { useQuery } from "@tanstack/react-query";
import UserItem from "./components/user-item";
import { usersQuery } from "@/hooks/queries/users/users";

export type ChatUser = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
};

export function UsersList() {
  const { data: users } = useQuery(usersQuery);
  return (
    <div className="flex flex-col h-full w-full max-h-[calc(100vh-357px)] lg:max-h-[calc(100vh-317px)]">
      <div className="flex flex-col gap-2 overflow-y-auto py-4 pe-2">
        {users?.map((user: ChatUser) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
