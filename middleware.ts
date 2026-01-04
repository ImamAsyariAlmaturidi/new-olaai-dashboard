import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATH_PREFIXES = [
  "/signin",
  "/signup",
  "/reset-password",
  "/two-step-verification",
  "/coming-soon",
  "/success",
];

const isPublicPath = (pathname: string): boolean =>
  PUBLIC_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isStaticFile = pathname.split("/").pop()?.includes(".") ?? false;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    isStaticFile ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images") ||
    isPublicPath(pathname)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
