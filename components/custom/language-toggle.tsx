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

  return <Button onClick={switchLocale}>{nextLocale.toUpperCase()}</Button>;
}
