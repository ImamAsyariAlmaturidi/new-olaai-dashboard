"use server";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backendUrl =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:4000";

const parseJsonSafe = async (response: Response) => {
  const body = await response.text();
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
};

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const res = await fetch(`${backendUrl}/api/admin/businesses/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const parsed = await parseJsonSafe(res);
  console.log("API Response:", { status: res.status, parsed });

  if (!res.ok) {
    return NextResponse.json(
      {
        error:
          typeof parsed === "string"
            ? parsed
            : parsed?.message ?? "Failed to fetch businesses",
      },
      { status: res.status }
    );
  }

  return NextResponse.json(parsed, { status: res.status });
}
