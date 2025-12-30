import { PrismaClient } from "@prisma/client";
import { getAdminIdFromHeaders } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET a single assignment
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const adminId = getAdminIdFromHeaders(request);
    if (!adminId) {
      return NextResponse.json(
        { error: "Admin authentication required" },
        { status: 401 },
      );
    }

    const { id } = await params;

    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: {
        submissions: {
          include: {
            team: true,
            player: true,
          },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            submissions: true,
            teams: true,
          },
        },
      },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(assignment);
  } catch (error) {
    console.error("Error fetching assignment:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Update the assignment
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const adminId = getAdminIdFromHeaders(request);
    if (!adminId) {
      return NextResponse.json(
        { error: "Admin authentication required" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const { title, description, location, order, exampleImage } =
      await request.json();

    if (!title || !description || !location || order === undefined) {
      return NextResponse.json(
        {
          error: "Title, description, location, and order are required",
        },
        { status: 400 },
      );
    }

    const assignment = await prisma.assignment.update({
      where: { id },
      data: {
        title,
        description,
        location,
        order: parseInt(order),
        exampleImage: exampleImage || null,
      },
    });

    return NextResponse.json(assignment);
  } catch (error) {
    console.error("Error updating assignment:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE the assignment
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const adminId = getAdminIdFromHeaders(request);
    if (!adminId) {
      return NextResponse.json(
        { error: "Admin authentication required" },
        { status: 401 },
      );
    }

    const { id } = await params;

    // Delete related records first to avoid foreign key constraint violations
    await prisma.teamAssignment.deleteMany({
      where: { assignmentId: id },
    });

    // Then delete the assignment
    await prisma.assignment.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.error("Error deleting assignment:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
