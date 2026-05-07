"use client";

import MessageInput from "./components/message-input";
import MessageItem from "./components/message-item";
import { useAutoScroll } from "./hooks/use-auto-scroll";
import TopBar from "./components/topbar";
import { useTranslations } from "next-intl";

export type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
};

const messages: Message[] = [
  {
    id: "1",
    text: "Hello, Ahmed",
    sender: "me",
  },
  {
    id: "2",
    text: "Hello, Mohamed",
    sender: "other",
  },
  {
    id: "3",
    text: "How are you doing today, Ahmed?",
    sender: "me",
  },
  {
    id: "4",
    text: "I'm doing well, thank you, Mohamed!",
    sender: "other",
  },
  {
    id: "5",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam harum, quia nisi, hic sequi vero necessitatibus praesentium vel sed ratione sunt. Praesentium officiis incidunt aspernatur? Rem fugit dignissimos blanditiis omnis.",
    sender: "me",
  },
  {
    id: "6",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam harum, quia nisi, hic sequi vero necessitatibus praesentium vel sed ratione sunt. Praesentium officiis incidunt aspernatur? Rem fugit dignissimos blanditiis omnis.",
    sender: "other",
  },
  {
    id: "7",
    text: "مرحبا أحمد كيف حالك؟",
    sender: "me",
  },
  {
    id: "8",
    text: "أنا بخير الحمد لله، كيف حالك محمد؟",
    sender: "other",
  },
  {
    id: "9",
    text: "بخير الحمد لله",
    sender: "me",
  },
  {
    id: "10",
    text: "اللهم إني أعوذ بك من العجز والكسل والجذام والجبن والهرم، وأعوذ بك من فتنة المحيا والممات، وأعوذ بك من عذاب القبر اللهم إني أعوذ بك من العجز والكسل والجذام والجبن والهرم، وأعوذ بك من فتنة المحيا والممات، وأعوذ بك من عذاب القبر",
    sender: "other",
  },
  {
    id: "11",
    text: "اللهم إني أعوذ بك من العجز والكسل والجذام والجبن والهرم، وأعوذ بك من فتنة المحيا والممات، وأعوذ بك من عذاب القبر اللهم إني أعوذ بك من العجز والكسل والجذام والجبن والهرم، وأعوذ بك من فتنة المحيا والممات، وأعوذ بك من عذاب القبر",
    sender: "me",
  },
  {
    id: "12",
    text: "It starts with English وبعد كده عربي",
    sender: "me",
  },
  {
    id: "13",
    text: "تبتدي عربي then English",
    sender: "me",
  },
];

export function MessagesList() {
  const t = useTranslations("chat");
  const { containerRef, bottomRef } = useAutoScroll({
    dependency: messages,
  });

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
        className="flex flex-col gap-2 overflow-y-auto py-4 pr-2"
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
