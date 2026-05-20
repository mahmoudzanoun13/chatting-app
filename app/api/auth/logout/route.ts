import { jsonResponse } from "@/lib/api-response";

export async function POST() {
  const response = jsonResponse(true, null, "logout_success", {}, 200);

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
