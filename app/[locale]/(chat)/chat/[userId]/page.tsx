import { MessagesList } from "@/components/chat/messages/messages-list";
import { MessagesListSkeleton } from "@/components/chat/messages/messages-list-skeleton";
import { Suspense } from "react";

type Props = {
  params: Promise<{ userId: string }>;
};

export default async function ChatPage({ params }: Props) {
  const { userId } = await params;
  return (
    <Suspense fallback={<MessagesListSkeleton />}>
      <MessagesList userId={userId} />
    </Suspense>
  );
}
