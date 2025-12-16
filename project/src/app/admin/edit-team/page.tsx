'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

export default function EditTeamPage() {
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

  return (
    <main className="min-h-screen bg-[#EDE6DC] flex relative pb-10 items-stretch">
      {/* Logo */}
      <div className="w-full max-w-xs mb-6 mt-8 md:absolute md:top-6 md:left-6">
        <Link href="/admin">
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
          href="/admin"
          className="mb-6 inline-block text-sm text-[#4B5563] hover:text-[#111827]"
        >
          ← Ga terug
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-8">
          Kies een team om te wijzigen
        </h1>

        <div className="space-y-4 max-w-xl">
          {teams.map((team, index) => (
            <Link
              key={team.id}
              href={`/admin/edit-team/${index + 1}`}
              className="flex items-center justify-between bg-white rounded-2xl border border-[#E5E7EB] px-6 py-4 shadow-sm hover:shadow-md hover:border-[#D1D5DB] transition"
            >
              <span className="font-medium text-[#111827]">{team.name}</span>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-lg leading-none">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
