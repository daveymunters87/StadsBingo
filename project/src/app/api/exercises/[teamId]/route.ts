import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const { teamId } = params;

    // if no teamId is found return response
    if (!teamId) {
      return new Response(JSON.stringify({ error: "Team ID is required" }), { status: 400 });
    }

    // fetch only assignments assigned to this team
    const teamAssignments = await prisma.teamAssignment.findMany({
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
      orderBy: { createdAt: "asc" },
    });

    // Format the assignments
    const formatted = teamAssignments.map((ta) => {
      const a = ta.assignment;
      return {
        id: a.id,
        title: a.title,
        description: a.description,
        location: a.location,
        order: a.order,
        status: a.submissions[0]?.status ?? "AVAILABLE",
      };
    });

    // Return the formated response
    return Response.json(formatted);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: (error as Error).message }), { status: 500 });
  }
}
