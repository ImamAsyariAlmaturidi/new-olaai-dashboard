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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: conversationId } = await params;
  if (!conversationId) {
    return NextResponse.json({ error: "Conversation ID is required" }, { status: 400 });
  }
  try {
    const res = await fetch(
      `${backendUrl}/api/chat/conversations/${encodeURIComponent(conversationId)}/messages`,
      {
        cache: "no-store",
      },
    );
    const parsed = await parseJsonSafe(res);

    if (!res.ok) {
      return NextResponse.json(
        {
          error:
            typeof parsed === "object"
              ? parsed.message || "Failed to load messages"
              : parsed,
        },
        { status: res.status },
      );
    }

    return NextResponse.json(parsed, { status: res.status });
  } catch (error) {
    console.error("chat messages proxy error:", error);
    return NextResponse.json(
      { error: "Unable to reach chat service" },
      { status: 502 },
    );
  }
}
