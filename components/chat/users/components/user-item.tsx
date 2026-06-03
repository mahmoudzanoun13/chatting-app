"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { type ChatUser } from "../users-list";
import { Link } from "@/i18n/navigation";
import { memo } from "react";
import { usePresenceStore } from "@/stores/presence-store";
import { useNotificationStore } from "@/stores/notification-store";
import { cn } from "@/lib/utils";

interface UserItemProps {
  user: ChatUser & { conversationId?: number };
}

const UserItem = memo(function UserItem({ user }: UserItemProps) {
  const isOnline = usePresenceStore((state) => state.isOnline(Number(user.id)));
  const unreadCount = useNotificationStore((state) => state.unreadCounts[user.conversationId ?? -1] || 0);
  const activeConversationId = useNotificationStore((state) => state.activeConversationId);

  const isActive = activeConversationId === user.conversationId;

  const displayInitial = user?.name?.charAt(0).toUpperCase() ?? "";
  return (
    <Link
      href={`/chat/${user.id}`}
      className={cn(
        "flex items-center gap-2 rounded-xl p-2 hover:bg-muted transition-colors",
        isActive && "bg-muted"
      )}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="relative">
          <Avatar className="size-8">
            {user?.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name ?? "User"} />
            ) : (
              <AvatarFallback>
                {displayInitial ?? <User className="size-4" />}
              </AvatarFallback>
            )}
          </Avatar>
          {isOnline && (
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500" />
          )}
        </div>
        <span
          className="font-bold truncate"
          title={user?.name}>
          {user?.name ?? "User"}
        </span>
      </div>

      {unreadCount > 0 && (
        <div className="shrink-0 ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
          {unreadCount > 9 ? "9+" : unreadCount}
        </div>
      )}
    </Link>
  );
});

UserItem.displayName = "UserItem";

export default UserItem;
