"use client";

import MessageItem from "./components/message-item";
import { useAutoScroll } from "./hooks/use-auto-scroll";
import { useTranslations } from "next-intl";
import { getSenderType } from "./utils/message-utils";
import { useConversationMessages } from "./hooks/use-conversation-messages";
import { useConversationSocket } from "./hooks/use-conversation-socket";
import { useSendMessage } from "./hooks/use-send-message";
import { MessagesListSkeleton } from "./messages-list-skeleton";
import { MessageModel } from "@/generated/prisma/models/Message";
import { UserModel } from "@/generated/prisma/models/User";
import ChatLayout from "./components/chat-layout";

export type MessageWithSender = MessageModel & {
  sender: Pick<UserModel, "id" | "name" | "email" | "avatar">;
  senderType: "me" | "other";
};

type Props = {
  userId: string;
};

export function MessagesList({ userId }: Props) {
  const t = useTranslations("chat");
  const {
    user,
    conversationId,
    messages,
    typedMessages,
    isLoading
  } = useConversationMessages(userId);

  const socket = useConversationSocket(conversationId, user);
  const { handleSend } = useSendMessage(conversationId, user, socket);

  const { containerRef, bottomRef } = useAutoScroll({
    dependency: messages,
  });

  if (isLoading) {
    return <MessagesListSkeleton />
  }

  if (typedMessages?.length === 0) {
    return (
      <ChatLayout userId={userId} onSend={handleSend}>
        <div className="flex flex-col h-full w-full items-center justify-center gap-2">
          <p className="text-sm font-semibold">{t("no_messages")}</p>
        </div>
      </ChatLayout>
    );
  }

  return (
    <ChatLayout userId={userId} onSend={handleSend}>
      <div
        ref={containerRef}
        className="flex flex-col gap-2 overflow-y-auto py-4 pe-2"
      >
        {typedMessages.map((message) => (
          <MessageItem
            key={message.id}
            text={message.content}
            sender={getSenderType(message.sender.id, user?.id)}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </ChatLayout>
  );
}
