import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type PathMatcher = string | RegExp;

const matches = (route: PathMatcher, pathname: string) =>
  typeof route === "string" ? route === pathname : route.test(pathname);

const protectedRoutes: PathMatcher[] = ["/", /^\/$/, /^\/dashboard(\/.*)?$/, /^\/profile(\/.*)?$/];
const publicRoutes: PathMatcher[] = [/^\/login(\/.*)?$/, /^\/registration(\/.*)?$/];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  // Allow public routes without a token
  if (!token && publicRoutes.some((route) => matches(route, pathname))) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users away from protected routes
  if (!token && protectedRoutes.some((route) => matches(route, pathname))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If authenticated, prevent navigating back to login or root
  if (token && (pathname === "/login" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};


