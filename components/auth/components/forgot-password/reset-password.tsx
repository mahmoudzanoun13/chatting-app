"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

type ResetPasswordProps = {
  nextStep: () => void;
};

export default function ResetPassword({ nextStep }: ResetPasswordProps) {
  const t = useTranslations("auth");
  const locale = useLocale();

  const handleSubmit = () => {
    nextStep();
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-bold tracking-tight">
          {t("reset_password")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("reset_password_description")}
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
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full cursor-pointer transition-opacity duration-300 hover:opacity-70"
        >
          {t("send_reset_email")}
        </Button>
      </form>
      <p className="text-sm">
        {locale === "ar" ? "→" : "←"} {t("back_to")}
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "link" }), "p-0.5")}
        >
          {t("login")}
        </Link>
      </p>
    </>
  );
}
