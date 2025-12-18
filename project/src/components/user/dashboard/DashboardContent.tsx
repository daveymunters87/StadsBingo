"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, FileText, Phone } from "lucide-react";

interface Team {
  id: string;
  name: string;
  code: string;
}

interface DashboardContentProps {
  team: Team;
}

export default function DashboardContent({ team }: DashboardContentProps) {
  return (
    <main className="min-h-screen bg-[#EDE6DC] pb-8">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-6 md:py-6">
        <div className="w-full max-w-xs mb-6 mt-8 md:absolute">
          <Link href={"/dashboard"}>
            <Image src="/logo.png" alt="NexEd" width={128} height={128} />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-[#2C2C2C] p-2 md:hidden"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <div className="px-4 md:px-6 md:max-w-4xl md:mx-auto">
        {/* Welcome Box */}
        <div className="bg-[#FFE600] rounded-2xl p-6 mb-8 mt-4 md:mt-8 md:p-8">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2 md:text-3xl">
            Welkom,
          </h2>
          <p className="text-xl font-semibold text-[#2C2C2C] mb-3 md:text-2xl">
            Team {team.name}
          </p>
          <p className="text-base text-[#2C2C2C] leading-relaxed md:text-lg">
            De Groningse stads bingo voor de
            <br />
            studenten van de Bit Academy
          </p>
        </div>

        {/* Navigeren Heading */}
        <h3 className="text-2xl font-bold text-[#2C2C2C] mb-6 ml-4 md:ml-0 md:text-center text-left md:text-4xl md:mb-8">
          Navigeren
        </h3>

        {/* Navigation Cards */}
        <div className="space-y-4 max-w-md mx-auto md:max-w-none md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
          {/* Opdrachten Card */}
          <Link
            href="/dashboard/exercises"
            className="block bg-[#F5F0E8] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] md:p-6"
          >
            <div className="flex items-start gap-4 md:flex-col md:items-center md:text-center md:gap-3">
              <div className="bg-[#FFE600] rounded-lg p-3 flex-shrink-0 md:p-4">
                <FileText className="h-6 w-6 text-[#4A5568] md:h-8 md:w-8" />
              </div>
              <div className="flex-1 md:flex-none">
                <h4 className="text-large font-bold text-[#2C2C2C] mb-1 md:text-2xl md:mb-2">
                  Opdrachten
                </h4>
                <p className="text-sm text-[#2C2C2C]/80 md:text-base font-light">
                  Bekijk en voltooi je opdrachten
                </p>
              </div>
            </div>
          </Link>
          {/* Contact Card */}
          <Link
            href="/dashboard/contact"
            className="block bg-[#F5F0E8] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] md:p-6"
          >
            <div className="flex items-start gap-4 md:flex-col md:items-center md:text-center md:gap-3">
              <div className="bg-[#FFE600] rounded-lg p-3 flex-shrink-0 md:p-4">
                <Phone className="h-6 w-6 text-[#4A5568] md:h-6 md:w-6" />
              </div>
              <div className="flex-1 md:flex-none">
                <h4 className="text-large font-bold text-[#2C2C2C] mb-1 md:text-2xl md:mb-2">
                  Contact
                </h4>
                <p className="text-sm text-[#2C2C2C]/80 md:text-base font-light">
                  Neem contact op met de docenten
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}