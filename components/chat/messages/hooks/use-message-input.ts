"use client";

import { useState, useRef, useEffect } from "react";
import { getSocket } from "@/lib/socket-client";

type UseMessageInputProps = {
  conversationId?: number;
  onSend: (text: string) => void;
};

export function useMessageInput({
  conversationId,
  onSend,
}: UseMessageInputProps) {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const emitTypingStatus = (status: boolean) => {
    if (!conversationId) return;
    const socket = getSocket();
    socket.emit("typing_status", { conversationId, isTyping: status });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);

    // Start typing
    if (!isTyping && value.trim()) {
      setIsTyping(true);
      emitTypingStatus(true);
    }

    // Stop typing timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      emitTypingStatus(false);
    }, 3000);
  };

  const handleSend = () => {
    if (!text.trim()) return;

    // Reset typing status on send
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    setIsTyping(false);
    emitTypingStatus(false);

    onSend(text.trim());
    setText("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return {
    text,
    inputRef,
    handleTextChange,
    handleSend,
    handleKeyDown,
  };
}
