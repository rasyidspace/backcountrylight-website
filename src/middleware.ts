import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/admin", req.url)); // Or redirect to profile
      }
      return null;
    }

    if (isAdminRoute && token?.role !== "ADMIN" && token?.role !== "STAFF") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return null;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
        if (isAdminRoute) {
          return token?.role === "ADMIN" || token?.role === "STAFF";
        }
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
