"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMessageInput } from "../hooks/use-message-input";

type Props = {
  conversationId?: number;
  onSend: (text: string) => void;
};

export default function MessageInput({ onSend, conversationId }: Props) {
  const t = useTranslations("chat");
  const { 
    text, 
    inputRef, 
    handleTextChange, 
    handleSend, 
    handleKeyDown 
  } = useMessageInput({ conversationId, onSend });

  return (
    <>
      <Textarea
        dir="auto"
        id="message"
        ref={inputRef}
        placeholder={t("type_message")}
        rows={1}
        className="h-auto min-h-10 max-h-40 resize-none overflow-y-auto"
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        size="icon"
        aria-label={t("send")}
        className="rounded-full size-10 cursor-pointer transition-opacity duration-300 hover:opacity-70"
        onClick={handleSend}
      >
        <Send className="size-4" />
      </Button>
    </>
  );
}

MessageInput.displayName = "MessageInput";
