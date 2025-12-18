import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Get teamcode from the request
    const { code } = await request.json();

    // Error handling for provided teamcode
    if (!code || code.trim() === "") {
      return NextResponse.json(
        { error: "Team code is required" },
        { status: 400 }
      );
    }

    // Get the team based on the provided code
    const team = await prisma.team.findUnique({
      where: { code },
      include: { captain: true, players: true },
    });

    // If not team is found, return error
    if (!team) {
      return NextResponse.json(
        { error: "Invalid team code" },
        { status: 401 }
      );
    }

    // Create response
    const response = NextResponse.json({
      teamId: team.id,
      captainId: team.captain?.id ?? null,
      players: team.players.map(p => ({ id: p.id, name: p.name })),
    });

    // Set cookie
    response.cookies.set("team-session", team.id, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      // secure: true, // enable in production
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
