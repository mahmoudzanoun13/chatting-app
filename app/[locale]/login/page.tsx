import LoginForm from "@/components/auth/components/login-form";

export default function LoginPage() {
  return (
    <section className="flex flex-col w-full items-center justify-center gap-10 py-10 md:min-h-[calc(100vh-192px)]">
      <LoginForm />
    </section>
  );
}
