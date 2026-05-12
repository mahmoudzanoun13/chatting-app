"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";

export default function UpdatePasswordSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-green-500/10">
          <Check className="size-8 text-green-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-bold">Password Updated Successfully</h1>
          <p className="text-sm text-muted-foreground">
            Your password has been updated successfully. You can now log in with
            your new password.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Click here to login with your new password
        </p>
        <Link href="/login" className={cn(buttonVariants({ variant: "link" }))}>
          Login
        </Link>
      </div>
    </>
  );
}
