"use client";

import MessageInput from "./components/message-input";
import MessageItem from "./components/message-item";
import { useAutoScroll } from "./hooks/use-auto-scroll";
import TopBar from "./components/topbar";
import { useTranslations } from "next-intl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { conversationByUserQuery } from "@/hooks/queries/conversations/by-user";
import { messagesQuery } from "@/hooks/queries/messages/messages";
import { MessagesListSkeleton } from "./messages-list-skeleton";
import { MessageModel } from "@/generated/prisma/models/Message";
import { UserModel } from "@/generated/prisma/models/User";
import { useEffect, useMemo } from "react";
import { useSocket } from "@/hooks/socket/use-socket";
import { useCurrentAuth } from "@/hooks/queries/auth/use-current-auth";

export type MessageWithSender = MessageModel & {
  sender: Pick<UserModel, "id" | "name" | "email" | "avatar">;
  senderType: "me" | "other";
};

type Props = {
  userId: string;
};

export function MessagesList({ userId }: Props) {
  const t = useTranslations("chat");

  const queryClient = useQueryClient();

  const { data: user } = useCurrentAuth();

  const { data: conversationId, isLoading: isConvLoading } = useQuery(
    conversationByUserQuery(userId)
  );
  
  const { data: messages = [], isLoading: isMsgLoading } = useQuery<MessageWithSender[]>(
    messagesQuery(conversationId)
  );

  const socket = useSocket(conversationId);

  const { containerRef, bottomRef } = useAutoScroll({
    dependency: messages,
  });

  const handleSend = (text: string) => {
    if (!conversationId || !user || !socket) return;

    const tempId = -Date.now();

    const optimisticMessage: MessageWithSender = {
      id: tempId,
      conversationId: Number(conversationId),
      senderId: Number(user.id),
      content: text,
      createdAt: new Date(),
      read: false,
      sender: {
        id: Number(user.id),
        name: user.name,
        email: user.email,
        avatar: user.avatar ?? null,
      },
      senderType: "me",
    };

    // optimistic update
    queryClient.setQueryData(
      messagesQuery(conversationId).queryKey,
      (old: MessageWithSender[] = []) => [...old, optimisticMessage]
    );

    socket.emit(
      "send_message",
      {
        content: text,
        conversationId: Number(conversationId),
        clientTempId: tempId,
      },
      (res: { success: boolean; messageId?: number }) => {
        if (!res.success) {
          // rollback
          queryClient.setQueryData(
            messagesQuery(conversationId).queryKey,
            (old: MessageWithSender[] = []) =>
              old.filter((m) => m.id !== tempId)
          );
        }
      }
    );
  };

  // =========================
  // SOCKET LISTENER
  // =========================
  useEffect(() => {
    if (!socket || !user) return;

    const handleIncomingMessage = (msg: MessageWithSender & { clientTempId?: number }) => {
      queryClient.setQueryData(
        messagesQuery(conversationId).queryKey,
        (old: MessageWithSender[] = []) => {
          // 1. Check if we already have this message by DB ID
          const existsById = old.some((m) => m.id === msg.id);
          if (existsById) {
            return old;
          }

          // 2. Check if this is a broadcast of a message we sent optimistically
          if (msg.clientTempId) {
            const tempIndex = old.findIndex((m) => m.id === msg.clientTempId);
            if (tempIndex !== -1) {
              // Replace optimistic message with real one
              const newMessages = [...old];
              newMessages[tempIndex] = msg;
              return newMessages;
            }
          }

          // Add new message to list
          return [...old, msg];
        }
      );
    };

    socket.on("receive_message", handleIncomingMessage);

    return () => {
      socket.off("receive_message", handleIncomingMessage);
    };
  }, [socket, user, conversationId, queryClient]);

  // =========================
  // TRANSFORM
  // =========================
  const typedMessages = useMemo(() => {
    if (!user) return [];

    return messages.map((msg) => ({
      ...msg,
      senderType: msg.sender.id === user.id ? "me" : "other",
    }));
  }, [messages, user]);

  if (isConvLoading || isMsgLoading) {
    return <MessagesListSkeleton />
  }

  if (typedMessages?.length === 0) {
    return (
      <div className="flex flex-col h-full w-full justify-end max-h-[calc(100vh-357px)] lg:max-h-[calc(100vh-317px)]">
        <TopBar userId={userId} />
        <div className="flex flex-col h-full w-full items-center justify-center gap-2">
          <p className="text-sm font-semibold">{t("no_messages")}</p>
        </div>
        <div dir="ltr" className="flex w-full items-end gap-2">
          <MessageInput onSend={handleSend} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full justify-end max-h-[calc(100vh-357px)] lg:max-h-[calc(100vh-317px)]">
      <TopBar userId={userId} />

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

      <div dir="ltr" className="flex w-full items-end gap-2">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}

const getSenderType = (senderId: number | string, userId: number | string): "me" | "other" =>
  senderId === userId ? "me" : "other";
