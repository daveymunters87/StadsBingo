import { PrismaClient } from "@prisma/client";
import { getAdminIdFromHeaders } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET all the assignments
export async function GET(request: Request) {
  try {
    const adminId = getAdminIdFromHeaders(request);
    if (!adminId) {
      return NextResponse.json({ error: "Admin authentication required" }, { status: 401 });
    }

    const assignments = await prisma.assignment.findMany({
      include: {
        _count: {
          select: {
            submissions: true,
            teams: true
          }
        }
      },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST create the new assignment
export async function POST(request: Request) {
  try {
    const adminId = getAdminIdFromHeaders(request);
    if (!adminId) {
      return NextResponse.json({ error: "Admin authentication required" }, { status: 401 });
    }

    const { title, description, location, order } = await request.json();

    if (!title || !description || !location || order === undefined) {
      return NextResponse.json({ 
        error: "Title, description, location, and order are required" 
      }, { status: 400 });
    }

    // Create the assignment
    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        location,
        order: parseInt(order)
      }
    });

    // Assign to all existing teams
    const teams = await prisma.team.findMany();
    await Promise.all(
      teams.map(team =>
        prisma.teamAssignment.create({
          data: {
            teamId: team.id,
            assignmentId: assignment.id
          }
        })
      )
    );

    return NextResponse.json(assignment);
  } catch (error) {
    console.error("Error creating assignment:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}