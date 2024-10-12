import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Log the requested URL to verify the middleware is running
  console.log("Request URL:", request.url);

  // Check if the request path is /dashboard

  return NextResponse.redirect(new URL("/", request.url)); // Redirect to home page

  // Otherwise, continue with the request
}

export const config = {
  matcher: "/login", // Only apply the middleware to /dashboard
};
