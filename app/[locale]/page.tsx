import { LanguageToggle } from "@/components/custom/language-toggle";
import { ModeToggle } from "@/components/custom/theme-toggle";
import { getTranslations } from "next-intl/server";

export default async function IndexPage() {
  const t = await getTranslations("metadata");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <ModeToggle />
      <LanguageToggle />
    </main>
  );
}
