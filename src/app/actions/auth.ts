"use server";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function doLogin(email: string) {
  const res = await fetch(`${backendURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("Failed to login");
  }

  const data = await res.json();
  return data;
}

export async function verifyCode(email: string, code: string) {
  const res = await fetch(`${backendURL}/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code }),
  });

  if (!res.ok) {
    throw new Error("Failed to verify code");
  }

  const data = await res.json();

  return data;
}
