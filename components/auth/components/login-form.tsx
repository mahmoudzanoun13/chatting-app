"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const t = useTranslations("auth");

  return (
    <div className="flex w-full max-w-sm flex-col gap-6 rounded-lg border bg-background p-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight">{t("login")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("enter_your_details_below_to_login")}
        </p>
      </div>
      <form className="grid gap-4">
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
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            required
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer transition-opacity duration-300 hover:opacity-70"
        >
          {t("login")}
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
          {t("login_with_google")}
        </Button>
      </form>
      <div className="flex flex-col text-sm">
        <p>
          {t("dont_have_an_account")}
          <Link
            href="/signup"
            className={cn(buttonVariants({ variant: "link" }), "p-0.5")}
          >
            {t("signup")}
          </Link>
        </p>
        <Link
          href="/forgot-password"
          className={cn(buttonVariants({ variant: "link" }), "self-start p-0")}
        >
          {t("forgot_your_password")}
        </Link>
      </div>
    </div>
  );
}
