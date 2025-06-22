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

  // ✅ Langsung lanjutkan untuk public route
  if (isPublicRoute) {
    if (token && isAuthPage) {
      // ⛔ Kalau sudah login dan akses /signin /signup, redirect ke home
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  // ⛔ Cek token hanya untuk protected route
  if (!token) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // ✅ Verifikasi token
  try {
    const { payload } = await jwtVerify(token.value, JWT_SECRET);

    const user = {
      id: payload.id as string,
      email: payload.email as string,
      exp: payload.exp as number,
      iat: payload.iat as number,
    };

    // ⛔ Token expired
    if (Date.now() >= user.exp * 1000) {
      const response = NextResponse.redirect(new URL("/signin", request.url));
      response.cookies.set("token", "", { maxAge: 0 });
      return response;
    }

    // ✅ Inject header
    const headers = new Headers(request.headers);
    headers.set("x-auth-token", token.value);
    headers.set("x-auth-id", user.id);
    headers.set("x-auth-email", user.email);
    headers.set("x-auth-exp", String(user.exp));
    headers.set("x-auth-iat", String(user.iat));

    return NextResponse.next({
      request: {
        headers,
      },
    });
  } catch (err) {
    // ⛔ Token invalid
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.set("token", "", { maxAge: 0 });
    return response;
  }
};
