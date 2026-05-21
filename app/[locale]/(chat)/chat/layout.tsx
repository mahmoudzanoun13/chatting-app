import { getTranslations } from "next-intl/server";
import { MessageSquare, Users as UsersIcon } from "lucide-react";
import { UsersList } from "@/components/chat/users/users-list";
import ContentBox from "@/components/chat/content-box";
import MobileChatTabs from "@/components/chat/mobile-chat-tabs";
import { Suspense } from "react";
import { UsersListSkeleton } from "@/components/chat/users/users-list-skeleton";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("chat");
  return (
    <section className="h-full w-full">
      {/* Mobile View: Tabs */}
      <div className="flex h-[calc(100vh-192px)] flex-col lg:hidden">
        <MobileChatTabs
          users={
            <ContentBox title={t("users")} Icon={UsersIcon}>
              <Suspense fallback={<UsersListSkeleton />}>
                <UsersList />
              </Suspense>
            </ContentBox>
          }
          messages={
            <ContentBox title={t("title")} Icon={MessageSquare} titleTag="h1">
              {children}
            </ContentBox>
          }
          usersLabel={t("users")}
          messagesLabel={t("title")}
        />
      </div>

      {/* Desktop View: Grid */}
      <div className="hidden h-[calc(100vh-192px)] grid-cols-4 gap-6 lg:grid">
        <div className="h-full">
          <ContentBox title={t("users")} Icon={UsersIcon}>
            <Suspense fallback={<UsersListSkeleton />}>
              <UsersList />
            </Suspense>
          </ContentBox>
        </div>
        <div className="h-full lg:col-span-3">
          <ContentBox title={t("title")} Icon={MessageSquare} titleTag="h1">
            {children}
          </ContentBox>
        </div>
      </div>
    </section>
  );
}
