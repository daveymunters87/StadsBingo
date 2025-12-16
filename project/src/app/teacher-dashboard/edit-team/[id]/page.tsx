'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface Team {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  captain?: {
    name: string;
  };
  _count: {
    players: number;
    submissions: number;
  };
}

export default function EditTeamFormPage() {
  const params = useParams();
  const teamId = params?.id as string;

  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/teams');
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const currentTeam = teams[Number(teamId) - 1];
  const teamTitle =
    !loading && currentTeam
      ? `${currentTeam.name} - wijzigen`
      : teamId
      ? `Team ${teamId} - wijzigen`
      : 'Team wijzigen';

  return (
    <main className="min-h-screen bg-[#EDE6DC] flex relative pb-10 items-stretch">
      {/* Logo */}
      <div className="w-full max-w-xs mb-6 mt-8 md:absolute md:top-6 md:left-6">
        <Link href="/teacher-dashboard">
          <Image src="/logo.png" alt="NexEd" width={128} height={128} />
        </Link>
      </div>

      {/* Left Sidebar */}
      <aside className="w-80 bg-[#EAE2D5] shadow-sm pt-32 pb-10 px-6 hidden md:block min-h-screen">
        <div className="bg-[#FFE600] rounded-2xl p-5 mb-10">
          <h2 className="text-2xl font-extrabold text-[#2C2C2C]">Welkom,</h2>
          <p className="text-2xl font-extrabold text-[#2C2C2C]">Admin</p>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-[#2C2C2C] mb-4">Teams</h3>
          <div className="space-y-1">
            {loading ? (
              <div className="text-sm text-[#6B7280]">Teams laden...</div>
            ) : teams.length === 0 ? (
              <>
                <div className="flex items-center justify-between py-3 cursor-pointer rounded hover:bg-[#F5F0E8]">
                  <div>
                    <div className="font-medium text-[#111827]">Team 1</div>
                    <div className="text-sm text-[#6B7280]">Active</div>
                  </div>
                  <span className="text-[#9CA3AF] text-lg">›</span>
                </div>
                <div className="flex items-center justify-between py-3 cursor-pointer rounded hover:bg-[#F5F0E8]">
                  <div>
                    <div className="font-medium text-[#111827]">Team 2</div>
                    <div className="text-sm text-[#6B7280]">Active</div>
                  </div>
                  <span className="text-[#9CA3AF] text-lg">›</span>
                </div>
              </>
            ) : (
              teams.map((team) => (
                <div
                  key={team.id}
                  className="flex items-center justify-between py-3 cursor-pointer rounded hover:bg-[#F5F0E8]"
                >
                  <div>
                    <div className="font-medium text-[#111827]">
                      {team.name}
                    </div>
                    <div className="text-sm text-[#6B7280]">Active</div>
                  </div>
                  <span className="text-[#9CA3AF] text-lg">›</span>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 px-6 pt-32 md:pt-32 md:px-16 max-w-3xl">
        <Link
          href="/teacher-dashboard/edit-team"
          className="mb-6 inline-block text-sm text-[#4B5563] hover:text-[#111827]"
        >
          ← Ga terug
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-1">
          {teamTitle}
        </h1>
        <p className="text-sm text-[#6B7280] mb-8">
          Pas hier het team aan
        </p>

        {/* Form layout only – no data or functionality yet */}
        <form className="space-y-6 max-w-xl">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#111827]">
              Team naam
            </label>
            <input
              type="text"
              placeholder="Vul hier de team naam in"
              className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FFE600] focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#111827]">
              Leerlingen
            </label>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                placeholder="Naam leerling"
                className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FFE600] focus:border-transparent"
              />
            ))}
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              className="px-6 py-2 rounded-lg border border-[#D1D5DB] bg-white text-sm font-medium text-[#111827] hover:bg-[#F3F4F6]"
            >
              Annuleren
            </button>
            <button
              type="button"
              className="px-8 py-2 rounded-lg bg-[#FFE600] text-sm font-semibold text-[#111827] hover:brightness-95"
            >
              Toevoegen →
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}


