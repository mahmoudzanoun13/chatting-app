import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatDropdown from "./chat-dropdown";
import { User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { userQuery } from "@/hooks/queries/users/user";

type TopBarProps = {
  userId?: string;
};

export default function TopBar({ userId }: TopBarProps) {
  const { data: user } = useQuery(userQuery(userId));
  const displayInitial = user?.name?.charAt(0).toUpperCase() ?? "";
  return (
    <div dir="ltr" className="flex items-center justify-between py-2 mb-auto">
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          {user?.avatar ? (
            <AvatarImage src={user.avatar} alt={user.name ?? "User"} />
          ) : (
            <AvatarFallback>
              {displayInitial ?? <User className="size-4" />}
            </AvatarFallback>
          )}
        </Avatar>
        <p className="text-sm font-semibold capitalize">
          {user?.name ?? "User"}
        </p>
      </div>
      <ChatDropdown />
    </div>
  );
}
