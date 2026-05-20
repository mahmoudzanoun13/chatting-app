import { NextResponse } from "next/server";

interface JsonResponse<T = unknown> {
  success: boolean;
  data: T | null;
  message: string;
  params?: Record<string, string | number | boolean>;
}

export function jsonResponse<T = unknown>(
  success: boolean,
  data: T | null = null,
  message: string = "",
  params: Record<string, string | number | boolean>,
  status: number = 200,
) {
  const body: JsonResponse<T> = {
    success,
    data,
    message,
    params,
  };

  return NextResponse.json(body, { status });
}
