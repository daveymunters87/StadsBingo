import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Admin logged out successfully",
  });

  // Clear the admin session cookie
  response.cookies.set("admin-session", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // Expire immediately
  });

  return response;
}
