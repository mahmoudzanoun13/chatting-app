"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type ResetPasswordProps = {
  nextStep: () => void;
};

export default function ResetPassword({ nextStep }: ResetPasswordProps) {
  const handleSubmit = () => {
    nextStep();
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-bold tracking-tight">Reset Password</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your email address and we will send you a link to reset your
          password.
        </p>
      </div>
      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            required
            id="email"
            type="email"
            autoComplete="username"
            placeholder="team@chatting-app.com"
          />
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full cursor-pointer transition-opacity duration-300 hover:opacity-70"
        >
          Send Reset Email
        </Button>
      </form>
      <p className="text-sm">
        ← Back to
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "link" }), "p-0.5")}
        >
          Login
        </Link>
      </p>
    </>
  );
}
