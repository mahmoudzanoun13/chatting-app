"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ChatDropdown() {
  const t = useTranslations("chat");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "cursor-pointer",
            )}
          >
            <MoreVertical />
          </button>
        }
      />
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer w-full p-0 justify-start"
            >
              <X className="size-4" />
              {t("close_chat")}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
