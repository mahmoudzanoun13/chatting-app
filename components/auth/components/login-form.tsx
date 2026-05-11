"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";

export default function LoginForm() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-lg border bg-background p-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your details below to login
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
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              required
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer transition-opacity duration-300 hover:opacity-70"
          >
            Login
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
            Login with Google
          </Button>
        </form>
        <div className="flex flex-col gap-4 text-sm">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </p>
          <Link href="/forgot-password" className="underline">
            Forgot your password?
          </Link>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        © {currentYear} ChattingApp
      </p>
    </>
  );
}
