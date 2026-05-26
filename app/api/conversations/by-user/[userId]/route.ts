import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAuthCookie } from "@/lib/auth";
import { jsonResponse } from "@/lib/api-response";

interface Params { userId: string }

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const auth = verifyAuthCookie(req);

  if (!auth) {
    return jsonResponse(false, null, "unauthorized", {}, 401);
  }

  const { userId } = await params;

  const otherUserId = parseInt(userId, 10);
  if (isNaN(otherUserId)) {
    return jsonResponse(false, null, "invalid_user_id", {}, 400);
  }

  let conversation = await prisma.conversation.findFirst({
    where: {
      OR: [
        { user1Id: auth.userId, user2Id: otherUserId },
        { user1Id: otherUserId, user2Id: auth.userId },
      ],
    },
  });

  // Create conversation if it doesn't exist yet
  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: { user1Id: auth.userId, user2Id: otherUserId },
    });
  }

  return jsonResponse(
    true,
    { conversationId: conversation.id },
    "conversation_fetched_successfully",
    {},
    200
  );
}
