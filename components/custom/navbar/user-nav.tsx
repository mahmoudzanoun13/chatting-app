"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Globe, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "../language-toggle";
import { ModeToggle } from "../theme-toggle";
import { Link } from "@/i18n/navigation";

export function UserNav() {
  const t = useTranslations("navbar");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:bg-muted p-1 rounded-full border bg-background shadow-sm outline-none">
            <Avatar className="size-8 border">
              <AvatarFallback className="bg-primary/10 text-primary">
                <User className="size-4" />
              </AvatarFallback>
            </Avatar>
          </button>
        }
      />
      <DropdownMenuContent className="w-64 p-2" align="end">
        <DropdownMenuGroup className="px-2 py-3">
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-bold leading-none">Username</p>
              <p className="text-xs leading-none text-muted-foreground">
                user@example.com
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mx-[-8px] my-2" />
        <div className="space-y-4 px-2 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <Globe className="size-4 text-primary" />
              </div>
              <span className="text-sm font-medium">
                {t("settings.language")}
              </span>
            </div>
            <LanguageToggle />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <Sun className="size-4 text-primary dark:hidden" />
                <Moon className="size-4 text-primary hidden dark:block" />
              </div>
              <span className="text-sm font-medium">{t("settings.theme")}</span>
            </div>
            <ModeToggle />
          </div>
        </div>
        <DropdownMenuSeparator className="mx-[-8px] my-2" />
        <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-muted focus:bg-muted">
          <Link href="/login" className="text-sm font-medium">
            {t("auth.sign_in")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
