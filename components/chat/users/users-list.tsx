"use client";

import { useQuery } from "@tanstack/react-query";
import UserItem from "./components/user-item";
import { usersQuery } from "@/hooks/queries/users/users";
import { UsersListSkeleton } from "./users-list-skeleton";
import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

export type ChatUser = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
};

const emptySubscribe = () => () => {};

export function UsersList() {
  const t = useTranslations("users");
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { data: users, isLoading } = useQuery(usersQuery);

  if (!isMounted || isLoading) {
    return (
      <div className="flex flex-col h-full w-full max-h-[calc(100vh-357px)] lg:max-h-[calc(100vh-317px)]">
        <div className="flex flex-col gap-2 overflow-y-auto py-4 pe-2">
          <UsersListSkeleton />
        </div>
      </div>
    );
  }

  if (users?.length === 0) {
    return (
      <div className="flex flex-col h-full w-full max-h-[calc(100vh-357px)] lg:max-h-[calc(100vh-317px)]">
        <div className="flex flex-col gap-2 overflow-y-auto py-4 pe-2">
          <p className="text-center text-muted-foreground">{t("no_users")}</p>
        </div>
      </div>
    );
  }

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
