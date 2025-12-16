import Link from "next/link";
import Image from "next/image";
import { Menu, CheckCircle2, ArrowRight, Lock } from "lucide-react";
import { getTeamFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Exercise {
  id: string;
  title: string;
  description: string;
  location: string;
  order: number;
  status: "LOCKED" | "AVAILABLE" | "PENDING" | "FEEDBACK" | "APPROVED";
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getExercises(teamId: string): Promise<Exercise[]> {
  try {
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
      orderBy: {
        assignment: {
          order: "asc",
        },
      },
    });

    // Format the assignments and determine status
    const formatted = teamAssignments.map((ta, index) => {
      const a = ta.assignment;
      const submission = a.submissions[0];
      
      // If there's a submission, use its status
      if (submission) {
        return {
          id: a.id,
          title: a.title,
          description: a.description,
          location: a.location,
          order: a.order,
          status: submission.status as Exercise["status"],
        };
      }
      
      // If no submission, check if previous assignments are completed
      // First assignment is always available
      if (index === 0) {
        return {
          id: a.id,
          title: a.title,
          description: a.description,
          location: a.location,
          order: a.order,
          status: "AVAILABLE" as const,
        };
      }
      
      // Check if previous assignment is approved
      const previousAssignment = teamAssignments[index - 1];
      const previousSubmission = previousAssignment.assignment.submissions[0];
      
      if (previousSubmission?.status === "APPROVED") {
        return {
          id: a.id,
          title: a.title,
          description: a.description,
          location: a.location,
          order: a.order,
          status: "AVAILABLE" as const,
        };
      }
      
      // Otherwise, it's locked
      return {
        id: a.id,
        title: a.title,
        description: a.description,
        location: a.location,
        order: a.order,
        status: "LOCKED" as const,
      };
    });

    return formatted;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
}

export default async function Exercises() {
  const team = await getTeamFromSession();
  
  if (!team) {
    redirect("/team-login");
  }

  const exercises = await getExercises(team.id);

  const completedCount = exercises.filter(
    (ex) => ex.status === "APPROVED"
  ).length;
  const totalCount = exercises.length;

  const getStatusText = (status: Exercise["status"]) => {
    switch (status) {
      case "APPROVED":
        return "Done";
      case "AVAILABLE":
      case "PENDING":
      case "FEEDBACK":
        return "Active";
      case "LOCKED":
        return "Locked";
      default:
        return "Active";
    }
  };

  return (
    <main className="min-h-screen bg-[#EDE6DC] pb-8">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-6">
      <div className="w-full max-w-xs mb-6 mt-8 md:absolute">
        <Image src="/logo.png" alt="NexEd" width={128} height={128} />
      </div>
        <button
          type="button"
          className="text-[#2C2C2C] p-2 md:hidden"
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      <div className="px-4 md:px-6 md:max-w-2xl md:mx-auto">
        {/* Yellow Information Box */}
        <div className="bg-[#FFE600] rounded-2xl p-6 mb-6 mt-4">
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-2">
            Opdrachten
          </h1>
          <p className="text-base text-[#2C2C2C]">
            Werk samen met je team en voltooi alle opdrachten in de stad.
          </p>
        </div>

        {/* Progress Section */}
        {exercises.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="text-base font-semibold text-[#2C2C2C]">
                {completedCount} van de {totalCount} opdrachten voltooid
              </p>
            </div>
            <p className="text-sm text-[#2C2C2C]/70 ml-8">
              Haal bingo door 5 op een rij te voltooien!
            </p>
          </div>
        )}

        {/* Exercises List */}
        {exercises.length === 0 ? (
          <div className="bg-[#F5F0E8] rounded-2xl p-6 text-center">
            <p className="text-[#2C2C2C]">Geen opdrachten beschikbaar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {exercises.map((exercise, index) => {
              const statusText = getStatusText(exercise.status);
              const isLocked = exercise.status === "LOCKED";
              const isDone = exercise.status === "APPROVED";

              return (
                <div
                  key={exercise.id}
                  className="bg-[#F5F0E8] rounded-2xl p-5 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {isDone && (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-[#2C2C2C] mb-1">
                        Opdracht {exercise.order || index + 1}
                      </h3>
                      <p className="text-sm text-[#2C2C2C]/70">{statusText}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {isLocked ? (
                      <div className="bg-[#2C2C2C] rounded-full p-2">
                        <Lock className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <Link
                        href={`/dashboard/exercises/${exercise.id}`}
                        className="bg-[#2C2C2C] rounded-full p-2 inline-block hover:opacity-80 transition-opacity"
                      >
                        <ArrowRight className="h-4 w-4 text-white" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
