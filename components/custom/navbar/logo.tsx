import { Link } from "@/i18n/navigation";
import { MessageCircle } from "lucide-react";

interface LogoProps {
  onClose?: () => void;
}

export function Logo({ onClose }: LogoProps) {
  return (
    <Link
      href="/chat"
      onClick={onClose}
      className="flex items-center gap-2 group"
    >
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
        <MessageCircle className="size-5 text-primary fill-primary/10 transition-transform group-hover:scale-110" />
      </div>
      <span
        dir="ltr"
        className="flex items-center text-xl font-bold tracking-tight"
      >
        Chatting<span className="text-primary ml-1">App</span>
      </span>
    </Link>
  );
}
