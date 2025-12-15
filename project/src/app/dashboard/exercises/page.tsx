"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, CheckCircle2, ArrowRight, Lock } from "lucide-react";

interface TeamData {
  teamId: string;
  teamName: string;
  captainId: string | null;
  players: Array<{ id: string; name: string }>;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  location: string;
  order: number;
  status: "LOCKED" | "AVAILABLE" | "PENDING" | "FEEDBACK" | "APPROVED";
}

export default function Exercises() {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("teamData");
    if (!stored) {
      router.push("/team-login");
      return;
    }

    try {
      const data = JSON.parse(stored);
      setTeamData(data);
      
      fetch(`/api/exercises/${data.teamId}`)
        .then((res) => res.json())
        .then((data) => {
          setExercises(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching exercises:", error);
          setLoading(false);
        });
    } catch {
      router.push("/team-login");
    }
  }, [router]);

  if (!teamData) {
    return (
      <div className="min-h-screen bg-[#EDE6DC] flex items-center justify-center">
        <p className="text-[#2C2C2C]">Laden...</p>
      </div>
    );
  }

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
        {!loading && exercises.length > 0 && (
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
        {loading ? (
          <div className="text-center py-8">
            <p className="text-[#2C2C2C]">Laden...</p>
          </div>
        ) : exercises.length === 0 ? (
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
