import { PrismaClient, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const admin = await prisma.user.findUnique({
      where: { 
        email,
        role: "ADMIN" as Role
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValidPassword = (admin as any).password === password;

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      adminId: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });

    // Set admin session cookie
    response.cookies.set("admin-session", admin.id, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}