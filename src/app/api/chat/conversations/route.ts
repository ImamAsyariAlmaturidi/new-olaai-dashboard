"use server";

import { NextResponse, NextRequest } from "next/server";

const backendUrl =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:4000";

const parseJsonSafe = async (response: Response) => {
  const payloadText = await response.text();
  try {
    return JSON.parse(payloadText);
  } catch {
    return payloadText;
  }
};

export async function GET(_request: NextRequest) {
  try {
    const res = await fetch(`${backendUrl}/api/chat/conversations`, {
      cache: "no-store",
    });
    const parsed = await parseJsonSafe(res);

    if (!res.ok) {
      return NextResponse.json(
        {
          error:
            typeof parsed === "object"
              ? parsed.message || "Failed to load conversations"
              : parsed,
        },
        { status: res.status },
      );
    }

    return NextResponse.json(parsed, { status: res.status });
  } catch (error) {
    console.error("chat conversations proxy error:", error);
    return NextResponse.json(
      { error: "Unable to reach chat service" },
      { status: 502 },
    );
  }
}
