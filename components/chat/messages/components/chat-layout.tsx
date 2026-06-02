import { ReactNode } from "react";
import TopBar from "./topbar";
import MessageInput from "./message-input";

type ChatLayoutProps = {
  userId: string;
  conversationId?: number;
  onSend: (text: string) => void;
  children: ReactNode;
};

export default function ChatLayout({ userId, conversationId, onSend, children }: ChatLayoutProps) {
  return (
    <div className="flex flex-col h-full w-full justify-end max-h-[calc(100vh-357px)] lg:max-h-[calc(100vh-317px)]">
      <TopBar userId={userId} conversationId={conversationId} />

      {children}

      <div dir="ltr" className="flex w-full items-end gap-2 px-2 pb-2">
        <MessageInput onSend={onSend} conversationId={conversationId} />
      </div>
    </div>
  );
}
