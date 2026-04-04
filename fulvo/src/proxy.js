import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  });

  // If the user is not authenticated and tries to access a protected route,
  // redirect them to the login page.
  if (!token && (request.nextUrl.pathname.startsWith("/feed") || request.nextUrl.pathname.startsWith("/profile"))) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// This middleware will run on all routes, but we can specify which ones we want to protect.
export const config = {
  matcher: ["/:path*"],
};
