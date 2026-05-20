import prisma from "@/lib/prisma";
import createRegisterSchema from "@/schemas/register-schema";
import bcrypt from "bcrypt";
import { parseZodMessage } from "@/lib/i18n-zod";
import { jsonResponse } from "@/lib/api-response";

const schema = createRegisterSchema();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const validation = schema.safeParse(body);

    if (!validation.success) {
      const { key, params } = parseZodMessage(validation.error.issues[0].message);

      if (process.env.NODE_ENV === "development") {
        console.warn(`Validation failed [${req.method}] ${req.url}`);
        console.warn("Body:", body);
        console.warn("Error details:", validation.error.issues);
      }

      return jsonResponse(false, null, key, params, 400);
    }

    const { name, email, password } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return jsonResponse(false, null, "email_already_exists", {}, 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },

      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
      },
    });

    return jsonResponse(true, user, "registration_success", {}, 201);
  } catch (error) {
    console.error(error);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
