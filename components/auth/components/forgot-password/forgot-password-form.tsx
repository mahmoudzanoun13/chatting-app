"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import ResetPassword from "./reset-password";
import SetPassword from "./set-password";
import UpdatePasswordSuccess from "./update-password-success";

export default function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step =
    (searchParams.get("step") as "reset" | "set" | "success") ?? "reset";

  const nextStep = () => {
    if (step === "reset") {
      router.push("?step=set");
    } else if (step === "set") {
      router.push("?step=success");
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6 rounded-lg border bg-background p-6">
      {step === "reset" && <ResetPassword nextStep={nextStep} />}
      {step === "set" && <SetPassword nextStep={nextStep} />}
      {step === "success" && <UpdatePasswordSuccess />}
    </div>
  );
}
