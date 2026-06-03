"use client";

import MessageItem from "./components/message-item";
import { useTranslations } from "next-intl";
import { getSenderType } from "./utils/message-utils";
import { MessagesListSkeleton } from "./messages-list-skeleton";
import { MessageModel } from "@/generated/prisma/models/Message";
import { UserModel } from "@/generated/prisma/models/User";
import ChatLayout from "./components/chat-layout";
import { Loader2, ChevronDown } from "lucide-react";
import { useMessagesList } from "./hooks/use-messages-list";

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
    typedMessages,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    showScrollToBottom,
    handleSend,
    handleLoadMore,
    scrollToBottom,
    containerRef,
    bottomRef,
  } = useMessagesList(userId);

  if (isLoading) {
    return <MessagesListSkeleton />;
  }

  if (!isFetchingNextPage && typedMessages?.length === 0) {
    return (
      <ChatLayout userId={userId} conversationId={Number(conversationId)} onSend={handleSend}>
        <div className="flex flex-col h-full w-full items-center justify-center gap-2">
          <p className="text-sm font-semibold">{t("no_messages")}</p>
        </div>
      </ChatLayout>
    );
  }

  return (
    <ChatLayout userId={userId} conversationId={Number(conversationId)} onSend={handleSend}>
      <div className="relative flex flex-col flex-1 min-h-0 overflow-hidden">
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto py-4 pe-2 flex flex-col gap-2"
        >
          {/* Load More button at the top */}
          {hasNextPage && (
            <div className="flex justify-center py-2">
              <button
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
                className="flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer"
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="size-3 animate-spin" />
                    {t("loading_more")}
                  </>
                ) : (
                  t("load_more")
                )}
              </button>
            </div>
          )}

          {typedMessages.map((message) => (
            <MessageItem
              key={message.id}
              text={message.content}
              sender={getSenderType(message.sender.id, user?.id)}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Scroll to bottom button */}
        {showScrollToBottom && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-4 inset-e-4 me-2 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 backdrop-blur-md text-primary shadow-lg ring-1 ring-primary/20 hover:bg-primary/30 transition-all active:scale-95 animate-in fade-in zoom-in duration-300 cursor-pointer"
            title={t("scroll_to_bottom")}
          >
            <ChevronDown className="size-5" />
          </button>
        )}
      </div>
    </ChatLayout>
  );
}
