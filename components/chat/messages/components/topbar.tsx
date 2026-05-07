import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ChatDropdown from "./chat-dropdown";
import { type Message } from "../messages-list";
import { User } from "lucide-react";

type TopBarProps = {
  messages: Message[];
};

export default function TopBar({ messages }: TopBarProps) {
  return (
    <div dir="ltr" className="flex items-center justify-between py-2 mb-auto">
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          <AvatarFallback>
            {messages.length > 0 ? (
              messages?.[0]?.sender.charAt(0).toUpperCase()
            ) : (
              <User className="size-4" />
            )}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold capitalize">
          {messages.length > 0 ? messages?.[0]?.sender : "User"}
        </p>
      </div>
      <ChatDropdown />
    </div>
  );
}
