// app/actions/connectPlatform.ts
"use server";

import { cookies } from "next/headers";

type PlatformType = "instagram" | "whatsapp";
const backendUrl = process.env.BACKEND_URL || "https://api.olaai.id/api";
export async function connectPlatform(platform: PlatformType): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized: No token found in cookies");

  const res = await fetch(`${backendUrl}/api/${platform}/oauth`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    redirect: "manual",
  });

  const redirectUrl = res.headers.get("location");
  if (!redirectUrl) throw new Error("Redirect URL not found");

  return redirectUrl;
}
