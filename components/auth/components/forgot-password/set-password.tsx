"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type SetPasswordProps = {
  nextStep: () => void;
};

export default function SetPassword({ nextStep }: SetPasswordProps) {
  const handleSubmit = () => {
    nextStep();
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-bold tracking-tight">Set a New Password</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your new password and confirm it to set a new password.
        </p>
      </div>
      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            required
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            required
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full cursor-pointer transition-opacity duration-300 hover:opacity-70"
        >
          Set New Password
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
