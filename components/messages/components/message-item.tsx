import { cn } from "@/lib/utils";

const startsWithArabic = /^\s*[\u0600-\u06FF]/;

type MessageItemProps = {
  text: string;
  sender: "me" | "other";
  className?: string;
};

export default function MessageItem({
  text,
  sender,
  className,
}: MessageItemProps) {
  const isArabic = startsWithArabic.test(text);
  return (
    <div
      className={cn(
        "p-2 rounded-xl w-fit",
        sender === "me" ? "ml-auto bg-primary/60" : "mr-auto bg-secondary",
        className,
      )}
    >
      <p dir={isArabic ? "rtl" : "ltr"} className="text-sm p-1">
        {text}
      </p>
    </div>
  );
}

MessageItem.displayName = "MessageItem";
