import { PrismaClient } from "@prisma/client";
import { getAdminIdFromHeaders } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET single submission
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
    
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: {
        team: {
          include: {
            players: true,
            captain: true
          }
        },
        assignment: true,
        player: true
      }
    });

    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT update submission status (approve/reject with feedback)
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
    const { status, feedback } = await request.json();

    if (!status || !['APPROVED', 'FEEDBACK', 'PENDING'].includes(status)) {
      return NextResponse.json({ 
        error: "Valid status is required (APPROVED, FEEDBACK, or PENDING)" 
      }, { status: 400 });
    }

    // Update the submission
    const submission = await prisma.submission.update({
      where: { id },
      data: {
        status,
        feedback: feedback || null,
        updatedAt: new Date()
      },
      include: {
        team: true,
        assignment: true
      }
    });

    // If approved, check if we need to unlock the next assignment for this team
    if (status === 'APPROVED') {
      const currentOrder = submission.assignment.order;
      const nextAssignment = await prisma.assignment.findFirst({
        where: { order: currentOrder + 1 }
      });

      if (nextAssignment) {
        // Check if team assignment exists
        const teamAssignment = await prisma.teamAssignment.findUnique({
          where: {
            teamId_assignmentId: {
              teamId: submission.teamId,
              assignmentId: nextAssignment.id
            }
          }
        });

        // Create team assignment if it doesn't exist
        if (!teamAssignment) {
          await prisma.teamAssignment.create({
            data: {
              teamId: submission.teamId,
              assignmentId: nextAssignment.id
            }
          });
        }
      }
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error updating submission:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}