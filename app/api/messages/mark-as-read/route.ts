import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { jsonResponse } from "@/lib/api-response";
import { verifyAuthCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const auth = verifyAuthCookie(req);

    if (!auth) {
      return jsonResponse(false, null, "unauthorized", {}, 401);
    }

    const { conversationId } = await req.json();

    if (!conversationId) {
      return jsonResponse(false, null, "conversation_id_required", {}, 400);
    }

    // Mark all messages in this conversation as read IF the user is NOT the sender
    await prisma.message.updateMany({
      where: {
        conversationId: Number(conversationId),
        senderId: { not: auth.userId },
        read: false,
      },
      data: {
        read: true,
      },
    });

    return jsonResponse(true, null, "messages_marked_as_read_successfully", {}, 200);
  } catch (err) {
    console.error(err);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
