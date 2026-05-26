import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAuthCookie } from "@/lib/auth";
import { jsonResponse } from "@/lib/api-response";

interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const auth = verifyAuthCookie(req);

    if (!auth) {
      return jsonResponse(false, null, "unauthorized", {}, 401);
    }

    const { id } = await params;

    const conversationId = parseInt(id, 10);
    if (isNaN(conversationId)) {
      return jsonResponse(false, null, "invalid_conversation_id", {}, 400);
    }

    // Pagination
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "20", 10);
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10);
    const skip = (page - 1) * limit;

    // Fetch messages
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      skip,
      take: limit,
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    // Mark messages as read for this user
    await prisma.message.updateMany({
      where: {
        conversationId,
        senderId: { not: auth.userId },
        read: false,
      },
      data: { read: true },
    });

    return jsonResponse(true, messages, "messages_fetched_successfully", {}, 200);
  } catch (err) {
    console.error(err);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
