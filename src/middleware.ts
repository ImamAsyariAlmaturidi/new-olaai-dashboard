import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");

  const isAuthApiRoute =
    pathname.startsWith("/api/auth/login") ||
    pathname.startsWith("/api/auth/register");

  const isPublic =
    isAuthRoute ||
    isAuthApiRoute ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static");

  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  // ⛔ Cegah user login membuka /signin atau /signup lagi
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url)); // redirect ke homepage atau dashboard
  }

  // ✅ Jika route public, lanjutkan
  if (isPublic) {
    return NextResponse.next();
  }

  // ⛔ Cek login status untuk route private
  if (!token) {
    // Kalau API → return 401
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Kalau bukan API → redirect ke /signin
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // ✅ Inject header token jika sudah login
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-auth-token", token.value);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};
