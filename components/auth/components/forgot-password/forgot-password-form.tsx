"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import ResetPassword from "./reset-password";
import SetPassword from "./set-password";
import UpdatePasswordSuccess from "./update-password-success";
import EmailSent from "./email-sent";

export default function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step =
    (searchParams.get("step") as "reset" | "email-sent" | "set" | "success") ??
    "reset";

  const nextStep = () => {
    if (step === "reset") {
      router.push("/forgot-password?step=email-sent");
    } else if (step === "set") {
      router.push("/forgot-password?step=success");
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6 rounded-lg border bg-background p-6">
      {step === "reset" && <ResetPassword nextStep={nextStep} />}
      {step === "email-sent" && <EmailSent />}
      {step === "set" && <SetPassword nextStep={nextStep} />}
      {step === "success" && <UpdatePasswordSuccess />}
    </div>
  );
}
