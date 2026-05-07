"use client";

import { RefObject, useEffect, useRef } from "react";

type UseAutoScrollOptions = {
  dependency: unknown;
  behavior?: ScrollBehavior;
};

type UseAutoScrollReturn = {
  containerRef: RefObject<HTMLDivElement | null>;
  bottomRef: RefObject<HTMLDivElement | null>;
};

export function useAutoScroll({
  dependency,
  behavior = "auto",
}: UseAutoScrollOptions): UseAutoScrollReturn {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior,
      block: "end",
    });
  }, [dependency, behavior]);

  return {
    containerRef,
    bottomRef,
  };
}
