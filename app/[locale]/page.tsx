import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export default async function IndexPage() {
  const locale = await getLocale();
  return redirect({ href: "/chat", locale });
}
