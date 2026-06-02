import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatDropdown from "./chat-dropdown";
import { User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { userQuery } from "@/hooks/queries/users/user";
import { usePresenceStore } from "@/stores/presence-store";
import { useTypingStore } from "@/stores/typing-store";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type TopBarProps = {
  userId?: string;
  conversationId?: number;
};

export default function TopBar({ userId, conversationId }: TopBarProps) {
  const t = useTranslations("chat");
  const { data: user } = useQuery(userQuery(userId));
  const isOnline = usePresenceStore((state) => state.isOnline(Number(userId)));
  const isOtherTyping = useTypingStore((state) => 
    !!(conversationId && state.typingUsers[conversationId]?.has(Number(userId)))
  );

  const displayInitial = user?.name?.charAt(0).toUpperCase() ?? "";
  return (
    <div dir="ltr" className="flex items-center justify-between py-2 mb-auto">
      <div className="flex items-center gap-2">
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
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold capitalize leading-none">
            {user?.name ?? "User"}
          </p>
          <span
            className={cn(
              "text-[10px] font-medium transition-colors",
              (isOnline || isOtherTyping) ? "text-green-500" : "text-muted-foreground"
            )}
          >
            {isOtherTyping ? t("typing") : (isOnline ? t("online") : t("offline"))}
          </span>
        </div>
      </div>
      <ChatDropdown />
    </div>
  );
}
