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

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  try {
    const res = await fetch(`${backendUrl}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", res.status);
    console.log("Response headers:", Object.fromEntries(res.headers.entries()));

    const parsed = await parseJsonSafe(res);

    console.log("Parsed response:", parsed);

    if (!res.ok) {
      const errorMessage =
        typeof parsed === "object" && parsed?.error
          ? parsed.error
          : typeof parsed === "string"
          ? parsed
          : "Login failed. Please try again.";

      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    const token =
      typeof parsed === "object" && parsed
        ? (parsed as Record<string, unknown>).accessToken
        : null;

    if (typeof token !== "string" || !token) {
      return NextResponse.json(
        { error: "Invalid response received from authentication service" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        message: "Login success",
        user: typeof parsed === "object" ? (parsed as any).user : undefined,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
