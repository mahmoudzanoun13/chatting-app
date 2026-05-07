"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { MessageSquare, Users as UsersIcon } from "lucide-react";

type Props = {
  users: React.ReactNode;
  messages: React.ReactNode;
  usersLabel: string;
  messagesLabel: string;
};

export default function MobileChatTabs({
  users,
  messages,
  usersLabel,
  messagesLabel,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const hasActiveChat = pathname !== "/chat";
  const activeTab = hasActiveChat ? "messages" : "users";

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => {
        if (value === "users") {
          router.push("/chat");
        }
      }}
      className="flex h-full flex-col gap-4"
    >
      <TabsList className="grid w-full grid-cols-2 rounded-full border bg-card shadow-sm">
        <TabsTrigger
          value="users"
          className="rounded-full data-active:bg-primary data-active:text-primary-foreground data-active:shadow-md"
        >
          <UsersIcon className="size-4" />
          {usersLabel}
        </TabsTrigger>

        <TabsTrigger
          value="messages"
          className="rounded-full data-active:bg-primary data-active:text-primary-foreground data-active:shadow-md"
          disabled={!hasActiveChat}
        >
          <MessageSquare className="size-4" />
          {messagesLabel}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="users" className="h-[calc(100%-80px)] outline-none">
        {users}
      </TabsContent>

      <TabsContent
        value="messages"
        className="h-[calc(100%-80px)] outline-none"
      >
        {messages}
      </TabsContent>
    </Tabs>
  );
}
