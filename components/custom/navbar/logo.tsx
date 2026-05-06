import { Link } from "@/i18n/navigation";

interface LogoProps {
  onClose?: () => void;
}

export function Logo({ onClose }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClose}
      className="flex items-center hover:scale-105"
    >
      <span dir="ltr" className="flex items-center">
        Chatting <span className="text-lg font-semibold text-primary">App</span>
      </span>
    </Link>
  );
}
