"use server";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

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

    const data = await parseJsonSafe(res);

    if (!res.ok) {
      const errorPayload =
        typeof data === "object"
          ? data.error ?? { api: [data.message || "Registration failed"] }
          : { api: [typeof data === "string" ? data : "Registration failed"] };

      return NextResponse.json(
        { errors: errorPayload },
        { status: res.status }
      );
    }

    if (typeof data !== "object" || !data.token) {
      return NextResponse.json(
        { errors: { api: ["Registration service returned invalid data"] } },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        message: "Registration successful",
        user: data.user,
        token: data.token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { errors: { api: ["Registration failed. Please try again."] } },
      { status: 500 }
    );
  }
}
