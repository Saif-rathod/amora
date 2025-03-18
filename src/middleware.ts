import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const user = request.cookies.get("user");
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isApiPage = request.nextUrl.pathname.startsWith("/api");
  const isProfilePage = request.nextUrl.pathname.startsWith("/profile");

  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (isProfilePage && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/auth/:path*"],
};
