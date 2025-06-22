"use server";

import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  try {
    const res = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData.error });
    }

    const data = await res.json();
    const response = NextResponse.json(
      { message: "Login success", user: data.user, token: data.token },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
