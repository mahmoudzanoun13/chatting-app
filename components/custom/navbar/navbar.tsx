"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { UserNav } from "./user-nav";
import { useTranslations } from "next-intl";

const links = [
  { label: "chat", href: "/chat" },
  { label: "about", href: "/about" },
];

export function Navbar() {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  return (
    <nav className="p-2 md:p-4">
      <div className="mx-auto flex max-w-xl items-center justify-between space-x-4 rounded-full border bg-background p-1.5 ps-4 pe-4 md:pe-0">
        <Logo />
        <div className="hidden md:inline-flex">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href === "/chat" && pathname.startsWith("/chat/"));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  isActive && "text-primary underline underline-offset-4",
                )}
              >
                {t(`links.${link.label}`)}
              </Link>
            );
          })}
        </div>
        <div className="hidden md:inline-flex items-center gap-4">
          <UserNav />
          <Link
            href="/signup"
            className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
          >
            {t("auth.sign_up")}
          </Link>
        </div>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
