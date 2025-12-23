import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [/^\/$/, /^\/dashboard(\/.*)?$/, /^\/profile(\/.*)?$/];
const publicRoutes = [/^\/login(\/.*)?$/, /^\/registration(\/.*)?$/];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("adminInfo");
  const { pathname } = req.nextUrl;

  // Allow public routes without a token
  if (!token && publicRoutes.some((route) => route.test(pathname))) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users away from protected routes
  if (!token && protectedRoutes.some((route) => route.test(pathname))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If authenticated, prevent navigating back to login or root
  if (token && (pathname === "/login" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/']
}


