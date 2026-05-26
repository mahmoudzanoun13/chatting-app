import { MessageModel } from "@/generated/prisma/models/Message";
import { UserModel } from "@/generated/prisma/models/User";

export type MessageWithSender = MessageModel & {
  sender: Pick<UserModel, "id" | "name" | "email" | "avatar">;
  senderType: "me" | "other";
};

// Creates an optimistic message object for immediate UI feedback
export const createOptimisticMessage = ({
  text,
  conversationId,
  user,
  tempId,
}: {
  text: string;
  conversationId: number | string;
  user: UserModel;
  tempId: number;
}): MessageWithSender => ({
  id: tempId,
  conversationId: Number(conversationId),
  senderId: Number(user.id),
  content: text,
  createdAt: new Date(),
  read: false,
  sender: {
    id: Number(user.id),
    name: user.name,
    email: user.email,
    avatar: user.avatar ?? null,
  },
  senderType: "me",
});

// Determines the sender type (me or other) based on IDs
export const getSenderType = (
  senderId: number | string,
  currentUserId: number | string | undefined
): "me" | "other" => (Number(senderId) === Number(currentUserId) ? "me" : "other");
