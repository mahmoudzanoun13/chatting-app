import { z } from "zod";
import { SchemaTranslator, defaultTranslator } from "@/lib/i18n-zod";

const createResetPasswordSchema = (t: SchemaTranslator = defaultTranslator) => {
  return z.object({
    email: z.email({ message: t("invalid_email") }),
  });
};

export type CreateResetPasswordSchema = z.infer<ReturnType<typeof createResetPasswordSchema>>;

export default createResetPasswordSchema;
