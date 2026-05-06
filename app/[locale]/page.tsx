import { getTranslations } from "next-intl/server";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users as UsersIcon } from "lucide-react";

interface BoxProps {
  title: string;
  children: React.ReactNode;
  Icon: React.ElementType;
}

function ContentBox({ title, children, Icon }: BoxProps) {
  return (
    <div className="flex h-full flex-col rounded-[2.5rem] border bg-card p-2 shadow-sm">
      <div className="flex flex-1 flex-col rounded-[2rem] bg-muted/50 p-6">
        <div className="pb-4">
          <div className="flex items-center gap-2">
            <Icon className="size-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          </div>
          <Separator className="mt-4" />
        </div>
        <div className="mt-2 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default async function IndexPage() {
  const t = await getTranslations("chat");

  return (
    <section className="h-full w-full">
      {/* Mobile View: Tabs */}
      <div className="flex h-[calc(100vh-178px)] flex-col lg:hidden">
        <Tabs defaultValue="messages" className="flex h-full flex-col gap-4">
          <TabsList className="grid w-full grid-cols-2 rounded-full border bg-card shadow-sm">
            <TabsTrigger
              value="messages"
              className="rounded-full data-active:bg-primary data-active:text-primary-foreground data-active:shadow-md"
            >
              <MessageSquare className="size-4" />
              {t("title")}
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="rounded-full data-active:bg-primary data-active:text-primary-foreground data-active:shadow-md"
            >
              <UsersIcon className="size-4" />
              {t("users")}
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="messages"
            className="h-[calc(100%-80px)] outline-none"
          >
            <ContentBox title={t("title")} Icon={MessageSquare}>
              <p className="text-muted-foreground italic">
                Select a conversation to start chatting...
              </p>
            </ContentBox>
          </TabsContent>
          <TabsContent
            value="users"
            className="h-[calc(100%-80px)] outline-none"
          >
            <ContentBox title={t("users")} Icon={UsersIcon}>
              <p className="text-muted-foreground italic">
                Online users will appear here...
              </p>
            </ContentBox>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop View: Grid */}
      <div className="hidden h-[calc(100vh-178px)] grid-cols-4 gap-6 lg:grid">
        <div className="h-full lg:col-span-3">
          <ContentBox title={t("title")} Icon={MessageSquare}>
            <p className="text-muted-foreground italic">
              Select a conversation to start chatting...
            </p>
          </ContentBox>
        </div>
        <div className="h-full">
          <ContentBox title={t("users")} Icon={UsersIcon}>
            <p className="text-muted-foreground italic">
              Online users will appear here...
            </p>
          </ContentBox>
        </div>
      </div>
    </section>
  );
}
