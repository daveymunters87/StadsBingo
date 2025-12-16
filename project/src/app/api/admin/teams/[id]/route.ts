import { PrismaClient } from "@prisma/client";
import { getAdminIdFromHeaders } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET single team
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminId = getAdminIdFromHeaders(request);
    if (!adminId) {
      return NextResponse.json({ error: "Admin authentication required" }, { status: 401 });
    }

    const { id } = await params;
    
    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        captain: true,
        players: true,
        createdBy: {
          select: { name: true, email: true }
        },
        submissions: {
          include: {
            assignment: true,
            player: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json(team);
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT update team
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminId = getAdminIdFromHeaders(request);
    if (!adminId) {
      return NextResponse.json({ error: "Admin authentication required" }, { status: 401 });
    }

    const { id } = await params;
    const { name, playerNames } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Team name is required" }, { status: 400 });
    }

    // Update team name
    await prisma.team.update({
      where: { id },
      data: { name }
    });

    // If playerNames provided, update players
    if (playerNames && Array.isArray(playerNames)) {
      // Delete existing players
      await prisma.teamPlayer.deleteMany({
        where: { teamId: id }
      });

      // Create new players
      const players = await Promise.all(
        playerNames.map((playerName: string, index: number) =>
          prisma.teamPlayer.create({
            data: {
              name: playerName,
              studentNumber: `S${Date.now()}${index}`,
              teamId: id,
            }
          })
        )
      );

      // Set first player as captain
      if (players.length > 0) {
        await prisma.team.update({
          where: { id },
          data: { captainId: players[0].id }
        });
      }
    }

    const updatedTeam = await prisma.team.findUnique({
      where: { id },
      include: {
        captain: true,
        players: true,
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(updatedTeam);
  } catch (error) {
    console.error("Error updating team:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE team
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminId = getAdminIdFromHeaders(request);
    if (!adminId) {
      return NextResponse.json({ error: "Admin authentication required" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.team.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}