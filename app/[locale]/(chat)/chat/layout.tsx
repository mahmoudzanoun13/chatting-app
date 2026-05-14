import { getTranslations } from "next-intl/server";
import { MessageSquare, Users as UsersIcon } from "lucide-react";
import { UsersList } from "@/components/chat/users/users-list";
import ContentBox from "@/components/chat/content-box";
import MobileChatTabs from "@/components/chat/mobile-chat-tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

function UsersListSkeleton() {
  return (
    <div className="flex flex-col gap-2 py-4 pe-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg p-2 border border-transparent"
        >
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}

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
