import { getTranslations } from "next-intl/server";

export default async function ChatIndexPage() {
  const t = await getTranslations("chat");
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <p className="text-sm font-semibold">{t("select_conversation")}</p>
    </div>
  );
}
