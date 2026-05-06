"use client";

import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();

  const nextLocale = locale === "en" ? "ar" : "en";

  const switchLocale = () => {
    router.replace("/", { locale: nextLocale });
  };

  return (
    <Button
      size="icon"
      onClick={switchLocale}
      className="cursor-pointer transition-opacity duration-300 hover:opacity-70"
    >
      {nextLocale.toUpperCase()}
    </Button>
  );
}
