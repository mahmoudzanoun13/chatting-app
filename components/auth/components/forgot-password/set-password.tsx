"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

type SetPasswordProps = {
  nextStep: () => void;
};

export default function SetPassword({ nextStep }: SetPasswordProps) {
  const t = useTranslations("auth");
  const locale = useLocale();

  const handleSubmit = () => {
    nextStep();
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-bold tracking-tight">
          {t("set_a_new_password")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("set_password_description")}
        </p>
      </div>
      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            required
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">{t("confirm_password")}</Label>
          <Input
            required
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full cursor-pointer transition-opacity duration-300 hover:opacity-70"
        >
          {t("set_new_password")}
        </Button>
      </form>
      <p className="text-sm">
        {locale === "ar" ? "→" : "←"} {t("back_to")}{" "}
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
