"use client";

import { useState } from "react";
import ResetPassword from "./reset-password";
import SetPassword from "./set-password";
import UpdatePasswordSuccess from "./update-password-success";

export default function ForgotPasswordForm() {
  const currentYear = new Date().getFullYear();

  const [step, setStep] = useState<"reset" | "set" | "success">("reset");

  const nextStep = () => {
    setStep((prev) => {
      if (prev === "reset") return "set";
      if (prev === "set") return "success";
      return prev;
    });
  };

  return (
    <>
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-lg border bg-background p-6">
        {step === "reset" && <ResetPassword nextStep={nextStep} />}
        {step === "set" && <SetPassword nextStep={nextStep} />}
        {step === "success" && <UpdatePasswordSuccess />}
      </div>

      <p className="text-sm text-muted-foreground">
        © {currentYear} ChattingApp
      </p>
    </>
  );
}
