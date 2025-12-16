import { PrismaClient } from "@prisma/client";
import { getAdminIdFromHeaders } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET all teams
export async function GET(request: Request) {
  try {
    const adminId = getAdminIdFromHeaders(request);
    if (!adminId) {
      return NextResponse.json({ error: "Admin authentication required" }, { status: 401 });
    }

    const teams = await prisma.team.findMany({
      include: {
        captain: true,
        players: true,
        createdBy: {
          select: { name: true, email: true }
        },
        _count: {
          select: {
            players: true,
            submissions: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST create new team
export async function POST(request: Request) {
  try {
    const adminId = getAdminIdFromHeaders(request);
    if (!adminId) {
      return NextResponse.json({ error: "Admin authentication required" }, { status: 401 });
    }

    const { name, playerNames } = await request.json();

    if (!name || !playerNames || !Array.isArray(playerNames) || playerNames.length === 0) {
      return NextResponse.json({ error: "Team name and players are required" }, { status: 400 });
    }

    // Generate unique team code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Create team
    const team = await prisma.team.create({
      data: {
        name,
        code,
        createdById: adminId,
      }
    });

    // Create players
    const players = await Promise.all(
      playerNames.map((playerName: string, index: number) =>
        prisma.teamPlayer.create({
          data: {
            name: playerName,
            studentNumber: `S${Date.now()}${index}`, // Generate unique student number
            teamId: team.id,
          }
        })
      )
    );

    // Set first player as captain
    if (players.length > 0) {
      await prisma.team.update({
        where: { id: team.id },
        data: { captainId: players[0].id }
      });
    }

    // Assign all existing assignments to this team
    const assignments = await prisma.assignment.findMany();
    await Promise.all(
      assignments.map(assignment =>
        prisma.teamAssignment.create({
          data: {
            teamId: team.id,
            assignmentId: assignment.id
          }
        })
      )
    );

    const createdTeam = await prisma.team.findUnique({
      where: { id: team.id },
      include: {
        captain: true,
        players: true,
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(createdTeam);
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}