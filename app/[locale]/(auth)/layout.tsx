export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <section className="flex flex-col w-full items-center justify-center gap-10 py-10 md:min-h-[calc(100vh-192px)]">
      {children}
      <p dir="ltr" className="text-sm text-muted-foreground">
        © {currentYear} ChattingApp
      </p>
    </section>
  );
}
