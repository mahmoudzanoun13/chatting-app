import { MessagesList } from "@/components/chat/messages/messages-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

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

type Props = {
  params: Promise<{ userId: string }>;
};

function MessagesListSkeleton() {
  return (
    <div className="flex flex-col h-full w-full justify-end max-h-[calc(100vh-357px)] lg:max-h-[calc(100vh-317px)]">
      {/* TopBar Skeleton */}
      <div className="flex items-center justify-between border-b px-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* Messages Skeleton */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto py-4 pe-2">
        <div className="flex justify-end">
          <Skeleton className="h-12 w-[60%] rounded-2xl rounded-tr-none" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-16 w-[70%] rounded-2xl rounded-tl-none" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-[40%] rounded-2xl rounded-tr-none" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-20 w-[80%] rounded-2xl rounded-tl-none" />
        </div>
      </div>

      {/* Input Skeleton */}
      <div className="flex w-full items-end gap-2 pt-2">
        <Skeleton className="h-12 flex-1 rounded-xl" />
        <Skeleton className="h-12 w-12 rounded-full shrink-0" />
      </div>
    </div>
  );
}

export default async function ChatPage({ params }: Props) {
  const { userId } = await params;
  return (
    <Suspense fallback={<MessagesListSkeleton />}>
      <MessagesList userId={userId} messages={messages} />
    </Suspense>
  );
}
