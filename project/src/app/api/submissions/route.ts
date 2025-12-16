import { PrismaClient } from "@prisma/client";
import { getTeamIdFromHeaders } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const teamId = getTeamIdFromHeaders(request);
    if (!teamId) {
      return NextResponse.json({ error: "Team authentication required" }, { status: 401 });
    }

    const { assignmentId, answerText, answerImage, playerId } = await request.json();

    if (!assignmentId) {
      return NextResponse.json({ error: "Assignment ID is required" }, { status: 400 });
    }

    if (!answerText && !answerImage) {
      return NextResponse.json({ error: "Either text answer or image is required" }, { status: 400 });
    }

    // Check if submission already exists
    const existingSubmission = await prisma.submission.findUnique({
      where: {
        teamId_assignmentId: {
          teamId,
          assignmentId
        }
      }
    });

    if (existingSubmission) {
      return NextResponse.json({ error: "Submission already exists for this assignment" }, { status: 400 });
    }

    // Create submission and set status to pending
    const submission = await prisma.submission.create({
      data: {
        teamId,
        assignmentId,
        playerId: playerId || null,
        answerText: answerText || null,
        answerImage: answerImage || null,
        status: "PENDING"
      },
      include: {
        assignment: true,
        team: true,
        player: true
      }
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error creating submission:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}