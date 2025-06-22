"use server";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";

const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).max(50).optional(),
  businessName: z.string().min(1).max(50).optional(),
  phoneNumber: z.string().min(10).max(15).optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedData = registerSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      {
        errors: parsedData.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { email, password, name, businessName, phoneNumber } = parsedData.data;

  try {
    const res = await fetch(`${backendUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
        businessName,
        phoneNumber,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({
        errors:
          typeof data.error === "object"
            ? data.error
            : { api: [data.error || "Registration failed"] },
      });
    }

    return NextResponse.json(
      { message: "Registration successful", user: data.user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { errors: { api: ["Registration failed. Please try again."] } },
      { status: 500 }
    );
  }
}
