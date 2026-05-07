"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { type ChatUser } from "../users-list";
import { Link } from "@/i18n/navigation";

interface UserItemProps {
  user: ChatUser;
}

export default function UserItem({ user }: UserItemProps) {
  return (
    <Link
      href={`/chat/${user.id}`}
      className="flex items-center gap-2 rounded-xl p-2 hover:bg-muted"
    >
      <Avatar className="size-8">
        <AvatarFallback>
          <User className="size-4" />
        </AvatarFallback>
      </Avatar>
      <span className="font-bold">{user.name}</span>
    </Link>
  );
}

UserItem.displayName = "UserItem";
