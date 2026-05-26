import { useMutation } from "@tanstack/react-query";
import type { Socket } from "socket.io-client";

type SendMessageResponse = {
  success: boolean;
  messageId?: number;
};

type SendMessagePayload = {
  content: string;
  conversationId: number;
};

export function useSendMessage(conversationId: number, socket: Socket | null) {
  return useMutation({
    mutationFn: async (content: string): Promise<SendMessageResponse> => {
      if (!socket || !socket.connected) {
        throw new Error("Socket not connected");
      }

      const payload: SendMessagePayload = {
        content,
        conversationId,
      };

      return new Promise<SendMessageResponse>((resolve, reject) => {
        socket.emit("send_message", payload, (res: SendMessageResponse) => {
          if (!res?.success) {
            return reject(new Error("Failed to send message"));
          }

          resolve(res);
        });
      });
    },
  });
}
