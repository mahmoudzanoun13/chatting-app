"use client";

import MessageInput from "./components/message-input";
import MessageItem from "./components/message-item";
import { useAutoScroll } from "./hooks/use-auto-scroll";
import TopBar from "./components/topbar";
import { useTranslations } from "next-intl";
import { Message } from "@/app/[locale]/(chat)/chat/[userId]/page";

type Props = {
  userId: string;
  messages: Message[];
};

export function MessagesList({ userId, messages }: Props) {
  const t = useTranslations("chat");
  const { containerRef, bottomRef } = useAutoScroll({
    dependency: messages,
  });
  console.log(userId);

  if (messages?.length === 0) {
    return (
      <div className="flex flex-col h-full w-full justify-end max-h-[calc(100vh-357px)] lg:max-h-[calc(100vh-317px)]">
        <TopBar messages={messages} />
        <div className="flex flex-col h-full w-full items-center justify-center gap-2">
          <p className="text-sm font-semibold">{t("no_messages")}</p>
        </div>
        <div dir="ltr" className="flex w-full items-end gap-2">
          <MessageInput />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full justify-end max-h-[calc(100vh-357px)] lg:max-h-[calc(100vh-317px)]">
      <TopBar messages={messages} />

      <div
        ref={containerRef}
        className="flex flex-col gap-2 overflow-y-auto py-4 pe-2"
      >
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            text={message.text}
            sender={message.sender}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <div dir="ltr" className="flex w-full items-end gap-2">
        <MessageInput />
      </div>
    </div>
  );
}
