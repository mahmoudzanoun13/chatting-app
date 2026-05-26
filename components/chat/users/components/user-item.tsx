"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { type ChatUser } from "../users-list";
import { Link } from "@/i18n/navigation";
import { memo } from "react";

interface UserItemProps {
  user: ChatUser;
}

const UserItem = memo(function UserItem({ user }: UserItemProps) {
  const displayInitial = user?.name?.charAt(0).toUpperCase() ?? "";
  return (
    <Link
      href={`/chat/${user.id}`}
      className="flex items-center gap-2 rounded-xl p-2 hover:bg-muted"
    >
      <Avatar className="size-8">
        {user?.avatar ? (
            <AvatarImage src={user.avatar} alt={user.name ?? "User"} />
          ) : (
            <AvatarFallback>
              {displayInitial ?? <User className="size-4" />}
            </AvatarFallback>
          )}
      </Avatar>
      <span className="font-bold">{user?.name ?? "User"}</span>
    </Link>
  );
});

UserItem.displayName = "UserItem";

export default UserItem;
