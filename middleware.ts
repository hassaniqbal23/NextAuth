import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Get the current path from the request
  const path = req.nextUrl.pathname;

  // Get the token from cookies
  const token = req.cookies.get("token")?.value;

  // If no token and trying to access "/home", redirect to the login page ("/")
  if (!token && path === "/home") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If a token exists and the user is trying to access the login page ("/"), redirect to "/home"
  if (token && path === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Allow the request to proceed for other paths
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home"], // Specify the routes to apply this middleware to
};
