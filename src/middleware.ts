import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const isAuthPage =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");
  const isApiAuth = pathname.startsWith("/api/auth");
  const isPublicAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static");

  const isPublicRoute = isAuthPage || isApiAuth || isPublicAsset;

  // ✅ 1. JIKA PUBLIC ROUTE
  if (isPublicRoute) {
    if (token && isAuthPage) {
      // ⛔ Jika sudah login, redirect dari /signin ke home
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // ✅ 2. JIKA PROTECTED ROUTE
  if (!token) {
    // ⛔ Akses API tanpa token
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ⛔ Akses page tanpa token (kecuali auth page yang udah ditangani di atas)
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  try {
    // ✅ Verifikasi token
    const { payload } = await jwtVerify(token.value, JWT_SECRET);

    const { _id, email, exp, iat } = payload as {
      _id: string;
      email: string;
      exp: number;
      iat: number;
    };

    // ⚠️ Token expired? Logging aja. Jangan dihapus di sini.
    if (Date.now() >= exp * 1000) {
      console.warn("⚠️ Token expired — client should handle refresh.");
    }

    // ✅ Inject user info ke headers
    const headers = new Headers(request.headers);
    headers.set("x-auth-id", _id);
    headers.set("x-auth-email", email);
    headers.set("x-auth-token", token.value);
    headers.set("x-auth-exp", String(exp));
    headers.set("x-auth-iat", String(iat));

    return NextResponse.next({
      request: { headers },
    });
  } catch (err) {
    // ⛔ Token corrupt / tidak valid
    console.error("❌ Token verification failed:", err);

    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/signin", request.url));
  }
};
