"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Logo } from "./logo";
import { LanguageToggle } from "../language-toggle";
import { ModeToggle } from "../theme-toggle";
import { Separator } from "@/components/ui/separator";

const links = [
  { label: "chat", href: "/" },
  { label: "about", href: "/about" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navbar");

  useEffect(() => {
    // if user toggle desktop/mobile view close menu
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = () => {
      if (mediaQuery.matches) {
        setOpen(false);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [pathname]);

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="outline" size="icon">
              <Menu />
              <span className="sr-only">{t("settings.toggle_menu")}</span>
            </Button>
          }
        />
        <SheetContent className="px-4">
          <SheetHeader>
            <SheetTitle>
              <Logo onClose={() => setOpen(false)} />
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "justify-start px-2",
                  pathname === link.href &&
                    "bg-accent text-primary underline underline-offset-4",
                )}
              >
                {t(`links.${link.label}`)}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "justify-start px-2",
                pathname === "/login" &&
                  "bg-accent text-primary underline underline-offset-4",
              )}
            >
              {t("auth.sign_in")}
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ size: "sm" }),
                "w-full rounded-full",
              )}
            >
              {t("auth.sign_up")}
            </Link>
          </div>
          <Separator className="mt-2" />
          <span className="font-bold text-muted-foreground">
            {t("settings.settings")}
          </span>
          <div className="flex flex-col gap-4">
            <span className="font-bold">{t("settings.language")}</span>
            <div className="self-start">
              <LanguageToggle />
            </div>
            <span className="font-bold">{t("settings.theme")}</span>
            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
