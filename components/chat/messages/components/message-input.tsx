"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  onSend: (text: string) => void;
};

export default function MessageInput({ onSend }: Props) {
  const t = useTranslations("chat");
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <>
      <Textarea
        dir="auto"
        id="message"
        placeholder={t("type_message")}
        rows={1}
        className="h-auto min-h-10 max-h-40 resize-none overflow-y-auto"
        value={text}
        onChange={(e) => setText(e.target.value)}
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
