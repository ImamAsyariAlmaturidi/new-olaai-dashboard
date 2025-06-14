"use server";

import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  try {
    const res = await fetch("https://api.example.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.message || "Login failed" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(
      { message: "Login successful", user: data.user, token: data.token },
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
