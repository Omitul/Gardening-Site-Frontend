import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getAccessToken } from "./services/authService/getCookie";
import { jwtDecode } from "jwt-decode";

const authRoutes = ["/login", "/registration"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: [/^\/dashboard/, /^\/profile/, /^\/checkout/],
  admin: [/^\/admin-dashboard/, /^\/profile/, /^\/checkout/],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("pathname", pathname);

  const token = getAccessToken();
  console.log("accesstoken", token);

  if (token === undefined) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  const { role }: { role: string } = jwtDecode(token!);

  console.log("role", role);

  if (role && roleBasedRoutes[role as Role]) {
    console.log("eikhane");

    const routes = roleBasedRoutes[role as Role];
    // console.log("ROUTESSSSSSS", routes);

    if (routes.some((route) => pathname.match(route))) {
      // console.log("dhukse");
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/dashboard",
    "/admin-dashboard",
    "/registration",
    "/profile",
    "/checkout",
  ],
};
