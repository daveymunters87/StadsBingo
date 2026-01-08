"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  ArrowRight,
  Lock,
  AlertCircle,
  Clock,
} from "lucide-react";
import {
  HamburgerMenu,
  HamburgerTrigger,
  useHamburgerMenu,
} from "@/components/ui/hamburger-menu";
import { Exercise, ExercisesListContentProps } from "@/types/user";

export default function ExercisesListContent({
  exercises,
}: ExercisesListContentProps) {
  const { isOpen, openMenu, closeMenu } = useHamburgerMenu();

  const completedCount = exercises.filter(
    (ex) => ex.status === "APPROVED",
  ).length;
  const totalCount = exercises.length;

  const getStatusInfo = (status: Exercise["status"]) => {
    switch (status) {
      case "APPROVED":
        return {
          text: "Voltooid",
          color: "text-green-600",
          bgColor: "bg-green-50",
          icon: CheckCircle2,
        };
      case "AVAILABLE":
        return {
          text: "Beschikbaar",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          icon: ArrowRight,
        };
      case "PENDING":
        return {
          text: "In behandeling",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          icon: Clock,
        };
      case "FEEDBACK":
        return {
          text: "Feedback ontvangen",
          color: "text-red-600",
          bgColor: "bg-red-50",
          icon: AlertCircle,
        };
      case "LOCKED":
        return {
          text: "Vergrendeld",
          color: "text-gray-500",
          bgColor: "bg-gray-50",
          icon: Lock,
        };
      default:
        return {
          text: "Beschikbaar",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          icon: ArrowRight,
        };
    }
  };

  return (
    <main className="min-h-screen bg-[#EDE6DC] pb-8">
      {/* Hamburger Menu */}
      <HamburgerMenu isOpen={isOpen} onClose={closeMenu} />

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-6">
        <div className="w-full max-w-xs mb-6 mt-8 md:absolute">
          <Image src="/logo.png" alt="NexEd" width={128} height={128} />
        </div>
        <HamburgerTrigger onClick={openMenu} className="md:hidden" />
      </header>

      <div className="px-4 md:px-6 md:max-w-2xl md:mx-auto">
        {/* Yellow Information Box */}
        <div className="bg-[#FFE600] rounded-2xl p-6 mb-6 mt-4">
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-2">Opdrachten</h1>
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
              Haal bingo door alle opdrachten te voltooien!
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
              const statusInfo = getStatusInfo(exercise.status);
              const isLocked = exercise.status === "LOCKED";
              const isDone = exercise.status === "APPROVED";
              const needsAction = exercise.status === "FEEDBACK";
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={exercise.id}
                  className={`rounded-2xl p-5 flex items-center justify-between shadow-sm transition-all ${
                    needsAction
                      ? "bg-red-50 border-2 border-red-200 animate-pulse"
                      : "bg-[#F5F0E8]"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-full ${statusInfo.bgColor}`}>
                      <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#2C2C2C] mb-1">
                        Opdracht {exercise.order || index + 1}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${statusInfo.color}`}
                        >
                          {statusInfo.text}
                        </span>
                        {needsAction && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                            Actie vereist
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {isLocked ? (
                      <div className="bg-gray-400 rounded-full p-2">
                        <Lock className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <Link
                        href={`/dashboard/exercises/${exercise.id}`}
                        className={`rounded-full p-2 inline-block hover:opacity-80 transition-opacity ${
                          needsAction
                            ? "bg-red-600 animate-pulse"
                            : "bg-[#2C2C2C]"
                        }`}
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
