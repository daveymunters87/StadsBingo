import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { teamId: string; exerciseId: string } }
) {
  try {
    const { teamId, exerciseId } = params;

    if (!teamId || !exerciseId) {
      return new Response(
        JSON.stringify({ error: "Team ID and Exercise ID are required" }),
        { status: 400 }
      );
    }

    // Check if assignment is assigned to this team
    const teamAssignment = await prisma.teamAssignment.findFirst({
      where: {
        teamId,
        assignmentId: exerciseId,
      },
      include: {
        assignment: {
          include: {
            submissions: {
              where: { teamId },
              take: 1,
              orderBy: { createdAt: "desc" },
            },
          },
        },
      },
    });

    if (!teamAssignment) {
      return new Response(
        JSON.stringify({ error: "Exercise not found or not assigned to this team" }),
        { status: 404 }
      );
    }

    const assignment = teamAssignment.assignment;
    const submission = assignment.submissions[0];

    // Get all team assignments to determine status
    const allTeamAssignments = await prisma.teamAssignment.findMany({
      where: { teamId },
      include: {
        assignment: {
          include: {
            submissions: {
              where: { teamId },
              take: 1,
            },
          },
        },
      },
      orderBy: {
        assignment: {
          order: "asc",
        },
      },
    });

    const currentIndex = allTeamAssignments.findIndex(
      (ta) => ta.assignmentId === exerciseId
    );

    let status: string;
    if (submission) {
      status = submission.status;
    } else if (currentIndex === 0) {
      status = "AVAILABLE";
    } else {
      const previousAssignment = allTeamAssignments[currentIndex - 1];
      const previousSubmission = previousAssignment.assignment.submissions[0];
      status = previousSubmission?.status === "APPROVED" ? "AVAILABLE" : "LOCKED";
    }

    return Response.json({
      id: assignment.id,
      title: assignment.title,
      description: assignment.description,
      location: assignment.location,
      order: assignment.order,
      status,
      submission: submission
        ? {
            id: submission.id,
            answerText: submission.answerText,
            answerImage: submission.answerImage,
            status: submission.status,
            feedback: submission.feedback,
            createdAt: submission.createdAt,
          }
        : null,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: (error as Error).message }),
      { status: 500 }
    );
  }
}

