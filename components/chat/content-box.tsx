import { Separator } from "@/components/ui/separator";

interface BoxProps {
  title: string;
  children: React.ReactNode;
  Icon: React.ElementType;
}

export default function ContentBox({ title, children, Icon }: BoxProps) {
  return (
    <div className="flex h-full flex-col rounded-[2.5rem] border bg-card p-2 shadow-sm">
      <div className="flex flex-1 flex-col rounded-[2rem] bg-muted/50 p-6">
        <div className="flex items-center gap-2">
          <Icon className="size-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        <Separator className="mt-4" />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
