"use client";

import { useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-32">
      <div className="space-y-2 text-center">
        <span className="font-semibold uppercase text-destructive">Error</span>
        <h1 className="text-balance text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-balance text-muted-foreground">{t("description")}</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <Button
          onClick={() => reset()}
          size="sm"
          className="cursor-pointer hover:opacity-70"
        >
          {t("try_again")}
        </Button>
        <Link
          href="/"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          {t("go_home")}
        </Link>
      </div>
    </section>
  );
}
