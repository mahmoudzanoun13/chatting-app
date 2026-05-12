"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

export default function SignupForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-lg border bg-background p-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            {t("create_an_account")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("get_started")}
          </p>
        </div>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{t("full_name")}</Label>
            <Input
              required
              id="name"
              type="text"
              placeholder={t("full_name")}
              autoComplete="name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              required
              id="email"
              type="email"
              autoComplete="username"
              placeholder="team@chatting-app.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t("new_password")}</Label>
            <Input
              required
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <p className="text-sm text-muted-foreground">
              {t("password_length")}
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">{t("confirm_password")}</Label>
            <Input
              required
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer transition-opacity duration-300 hover:opacity-70"
          >
            {t("create_account")} {locale === "en" ? "→" : "←"}
          </Button>

          <div className="flex h-2 w-full items-center gap-4 text-muted-foreground">
            <div className="w-full">
              <Separator />
            </div>
            <p>{t("or")}</p>
            <div className="w-full">
              <Separator />
            </div>
          </div>

          <Button variant="outline" className="w-full cursor-pointer">
            {t("continue_with_google")}
          </Button>
        </form>
        <p className="text-sm">
          {t("already_have_an_account")}
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "link" }), "p-0.5")}
          >
            {t("login")}
          </Link>
        </p>
      </div>

      <p dir="ltr" className="text-sm text-muted-foreground">
        © {currentYear} ChattingApp
      </p>
    </>
  );
}
