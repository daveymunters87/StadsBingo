"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, User, Phone, Mail, Link } from "lucide-react";

interface TeamData {
  teamId: string;
  teamName: string;
  captainId: string | null;
  players: Array<{ id: string; name: string }>;
}

interface Mentor {
  name: string;
  role: string;
  email: string;
  phone: string;
}

const mentors: Mentor[] = [
  {
    name: "Reygan Leito",
    role: "Mentor 24SDB",
    email: "ra.leito@noorderpoort.nl",
    phone: "+31882308178",
  },
  {
    name: "Adi Soerjaman",
    role: "Mentor 23SDB",
    email: "adi.soerjaman@noorderpoort.nl",
    phone: "+31882308179",
  },
  {
    name: "Jesper Bekking",
    role: "Mentor 24SDG",
    email: "jesper.bekking@noorderpoort.nl",
    phone: "+31882308180",
  },
];

export default function ContactPage() {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
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

  return (
    <main className="min-h-screen bg-[#EDE6DC] pb-8">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-6">
      <div className="w-full max-w-xs mb-6 mt-8 md:absolute">
      <Link href={"/dashboard"}>
          <Image src="/logo.png" alt="NexEd" width={128} height={128} />
        </Link>
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
        {/* Contact Information Box */}
        <div className="bg-[#FFE600] rounded-2xl p-6 mb-6 mt-4">
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-3">Contact</h1>
          <p className="text-base text-[#2C2C2C] leading-relaxed">
            Mocht je er niet uit komen en er is geen docent in de buurt, neem
            contact op met jou mentor.
          </p>
        </div>

        {/* Docenten Section */}
        <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4">Docenten</h2>

        {/* Mentor Cards */}
        <div className="space-y-4">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-sm flex items-start gap-4"
            >
              {/* Icon */}
              <div className="bg-[#FFE600] rounded-lg p-3 flex-shrink-0">
                <User className="h-6 w-6 text-[#2C2C2C]" />
              </div>

              {/* Contact Details */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#2C2C2C] mb-1">
                  {mentor.name}
                </h3>
                <p className="text-sm text-[#2C2C2C]/70 mb-3">{mentor.role}</p>

                {/* Contact Information */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#2C2C2C]" />
                    <a
                      href={`mailto:${mentor.email}`}
                      className="text-sm text-[#2C2C2C] underline"
                    >
                      {mentor.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#2C2C2C]" />
                    <a
                      href={`tel:${mentor.phone}`}
                      className="text-sm text-[#2C2C2C] underline"
                    >
                      {mentor.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
