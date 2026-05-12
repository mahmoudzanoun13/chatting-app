import ForgotPasswordForm from "@/components/auth/components/forgot-password/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <section className="flex flex-col w-full items-center justify-center gap-10 py-10 md:min-h-[calc(100vh-192px)]">
      <ForgotPasswordForm />
    </section>
  );
}
