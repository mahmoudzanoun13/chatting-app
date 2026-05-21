"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
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
import { useLocale, useTranslations } from "next-intl";
import { Logo } from "./logo";
import { LanguageToggle } from "../language-toggle";
import { ModeToggle } from "../theme-toggle";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Globe, Moon, Sun } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { meQuery } from "@/hooks/queries/auth/me";
import { useLogout } from "@/hooks/mutations/auth/use-logout";
import { Spinner } from "@/components/ui/spinner";

const links = [
  { label: "chat", href: "/chat" },
  { label: "about", href: "/about" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navbar");
  const locale = useLocale();
  const router = useRouter();

  const side = locale === "ar" ? "left" : "right";

  const { data: user, isLoading } = useQuery(meQuery);
  const { mutateAsync: logout, isPending } = useLogout();

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

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  if (isLoading) {
    return null;
  }

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
        <SheetContent side={side} className="flex flex-col gap-0">
          <SheetHeader className="pb-6 pt-2 px-4 rtl:pr-2">
            <SheetTitle>
              <Logo onClose={() => setOpen(false)} />
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-1 overflow-y-auto pr-2 px-4">
            <div className="mb-4 flex items-center gap-3 rounded-2xl bg-muted/50 p-3">
              <Avatar className="size-10 border">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="size-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{user?.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === "/chat" && pathname.startsWith("/chat/"));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "h-10 justify-start rounded-xl px-3",
                      isActive && "bg-accent text-primary font-semibold",
                    )}
                  >
                    {t(`links.${link.label}`)}
                  </Link>
                );
              })}
            </div>

            <Separator className="my-4" />

            <div className="space-y-4 px-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Globe className="size-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">
                    {t("settings.language")}
                  </span>
                </div>
                <LanguageToggle onSwitch={() => setOpen(false)} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Sun className="size-4 text-primary dark:hidden" />
                    <Moon className="size-4 text-primary hidden dark:block" />
                  </div>
                  <span className="text-sm font-medium">
                    {t("settings.theme")}
                  </span>
                </div>
                <ModeToggle />
              </div>
            </div>

            <Separator className="my-4" />

            <div className="mt-auto flex flex-col gap-2 pb-6">
              {/* TODO: add loading state */}
              {user && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  disabled={isPending}
                  className={cn("h-10 w-full rounded-xl px-3")}
                >
                  {isPending ? <Spinner /> : t("auth.logout")}
                </Button>
              )}
              {!user && (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "h-10 w-full rounded-xl px-3",
                  )}
                >
                  {t("auth.sign_in")}
                </Link>
              )}
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "h-10 w-full rounded-xl font-semibold",
                )}
              >
                {t("auth.sign_up")}
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
