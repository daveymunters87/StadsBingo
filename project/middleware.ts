import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminSession = request.cookies.get("admin-session");
  const teamSession = request.cookies.get("team-session");

  /* ================= ADMIN PAGES ================= */
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    if (!adminSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const headers = new Headers(request.headers);
    headers.set("x-admin-id", adminSession.value);

    return NextResponse.next({
      request: { headers },
    });
  }

  /* ================= ADMIN API ================= */
  if (pathname.startsWith("/api/admin")) {
    if (!adminSession) {
      return NextResponse.json(
        { error: "Admin authentication required" },
        { status: 401 },
      );
    }

    const headers = new Headers(request.headers);
    headers.set("x-admin-id", adminSession.value);

    return NextResponse.next({
      request: { headers },
    });
  }

  /* ================= TEAM PUBLIC ================= */
  const publicRoutes = [
    "/team-login",
    "/api/auth/team-login",
    "/api/auth/admin-login",
    "/api/auth/admin-logout",
  ];

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  /* ================= TEAM PROTECTED ================= */
  if (!teamSession) {
    if (!pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/team-login", request.url));
    }

    return NextResponse.json(
      { error: "Team authentication required" },
      { status: 401 },
    );
  }

  const headers = new Headers(request.headers);
  headers.set("x-team-id", teamSession.value);

  return NextResponse.next({
    request: { headers },
  });
}
