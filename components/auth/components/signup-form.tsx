"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default function SignupForm() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-lg border bg-background p-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Get started with ChattingApp today.
          </p>
        </div>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              required
              id="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
            />
          </div>
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
          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              required
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <p className="text-sm text-muted-foreground">
              Must be at least 8 characters long.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              required
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer transition-opacity duration-300 hover:opacity-70"
          >
            Create Account →
          </Button>

          <div className="flex h-2 w-full items-center gap-4 text-muted-foreground">
            <div className="w-full">
              <Separator />
            </div>
            <p>or</p>
            <div className="w-full">
              <Separator />
            </div>
          </div>

          <Button variant="outline" className="w-full cursor-pointer">
            Continue with Google
          </Button>
        </form>
        <p className="text-sm">
          Already have an account?
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "link" }), "p-0.5")}
          >
            Login
          </Link>
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        © {currentYear} ChattingApp
      </p>
    </>
  );
}
