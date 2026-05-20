import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!, // e.g., http://localhost:3000/api/auth/google/callback
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline", // for refresh tokens if needed
    prompt: "select_account", // forces account chooser
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  return NextResponse.redirect(url);
}
