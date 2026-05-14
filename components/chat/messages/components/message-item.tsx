import { cn } from "@/lib/utils";
import { memo } from "react";

type MessageItemProps = {
  text: string;
  sender: "me" | "other";
  className?: string;
};

const MessageItem = memo(function MessageItem({
  text,
  sender,
  className,
}: MessageItemProps) {
  return (
    <div
      className={cn(
        "p-2 rounded-xl w-fit",
        sender === "me" ? "ml-auto bg-primary/60" : "mr-auto bg-secondary",
        className,
      )}
    >
      <p dir="auto" className="text-sm p-1">
        {text}
      </p>
    </div>
  );
});

MessageItem.displayName = "MessageItem";

export default MessageItem;
