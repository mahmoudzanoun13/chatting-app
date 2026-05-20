"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  newRegistration?: string;
  successLogin?: string;
};

export default function ChatToaster({ newRegistration, successLogin }: Props) {
  const t = useTranslations("auth.responses");
  useEffect(() => {
    if (newRegistration === "true") {
      toast.success(t("registration_success"));
    }

    if (successLogin === "true") {
      toast.success(t("login_success"));
    }
  }, [newRegistration, successLogin, t]);

  return null;
}
