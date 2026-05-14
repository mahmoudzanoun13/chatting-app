"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MessageInput() {
  const t = useTranslations("chat");
  return (
    <>
      <Textarea
        dir="auto"
        id="message"
        placeholder={t("type_message")}
        rows={1}
        className="h-auto min-h-10 max-h-40 resize-none overflow-y-auto"
      />
      <Button
        size="icon"
        aria-label={t("send")}
        className="rounded-full size-10 cursor-pointer transition-opacity duration-300 hover:opacity-70"
      >
        <Send className="size-4" />
      </Button>
    </>
  );
}

MessageInput.displayName = "MessageInput";
