"use server";

import { z } from "zod";
import { registerSchema } from "@/schemas/registerSchema";
import { cookies } from "next/headers";

export type RegisterData = z.infer<typeof registerSchema>;
export async function doRegister(data: RegisterData) {
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`/api/auth/register`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed.data),
  });

  const result = await response.json();

  // Jika gagal parsing JSON (contohnya server return HTML / 500)
  if (!result) {
    return {
      success: false,
      errors: { api: ["Unexpected server error. Please try again."] },
    };
  }

  // Jika response tidak OK (error dari backend)
  if (!response.ok) {
    return {
      success: false,
      errors:
        typeof result.errors === "object"
          ? result.errors
          : { api: [result.error || "Registration failed"] },
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("token", result.token, {
    // Meng-set cookie agar hanya bisa diakses melalui HTTP(S)
    httpOnly: true,
    // Meng-set cookie agar hanya bisa diakses melalui HTTPS, karena ini hanya untuk development, maka kita akan set false
    secure: false,
    // Meng-set expiration time dari cookies
    expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    // Meng-set cookie agar hanya bisa diakses melalui domain yang sama
    sameSite: "strict",
  });

  return {
    success: true,
    user: result.user,
  };
}

export async function doLogin(email: string, password: string) {
  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  // Jika gagal parsing JSON (contohnya server return HTML / 500)
  if (!result) {
    return {
      success: false,
      error: "Unexpected server error. Please try again.",
    };
  }

  // Jika response tidak OK (error dari backend)
  if (result.error) {
    return {
      success: false,
      error: result.error || "Login failed",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("token", result.token, {
    // Meng-set cookie agar hanya bisa diakses melalui HTTP(S)
    httpOnly: true,
    // Meng-set cookie agar hanya bisa diakses melalui HTTPS, karena ini hanya untuk development, maka kita akan set false
    secure: false,
    // Meng-set expiration time dari cookies
    expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    // Meng-set cookie agar hanya bisa diakses melalui domain yang sama
    sameSite: "strict",
  });

  return {
    success: true,
    user: result.user,
  };
}

export async function doLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
