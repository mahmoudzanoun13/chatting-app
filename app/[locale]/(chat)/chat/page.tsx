import ChatToaster from "@/components/chat/chat-toaster";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: Promise<{ newRegistration?: string; successLogin?: string }>;
  params: Promise<{ locale: string }>;
};

export default async function ChatIndexPage({ searchParams, params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "chat" });

  const { newRegistration, successLogin } = await searchParams;

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <p className="text-sm font-semibold">{t("select_conversation")}</p>
      <ChatToaster
        newRegistration={newRegistration}
        successLogin={successLogin}
      />
    </div>
  );
}
