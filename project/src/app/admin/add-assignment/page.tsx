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

export default function AddAssignmentPage() {
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

  const renderUploadPlaceholder = () => (
    <div className="w-full rounded-lg border border-dashed border-[#D1D5DB] bg-[#F9FAFB] px-4 py-6 flex flex-col items-center justify-center text-xs text-[#6B7280]">
      <div className="mb-2 h-16 w-full bg-[repeating-linear-gradient(45deg,#E5E7EB,#E5E7EB_10px,#F9FAFB_10px,#F9FAFB_20px)] rounded-md" />
      <button
        type="button"
        className="mt-2 inline-flex items-center justify-center rounded-md border border-[#D1D5DB] bg-white px-3 py-1 text-xs font-medium text-[#111827] hover:bg-[#F3F4F6]"
      >
        Kies een afbeelding
      </button>
    </div>
  );

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
      <section className="flex-1 px-6 pt-32 md:pt-32 md:px-16">
        <Link
          href="/admin"
          className="mb-6 inline-block text-sm text-[#4B5563] hover:text-[#111827]"
        >
          ← Ga terug
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-1">
          Opdracht toevoegen
        </h1>
        <p className="text-sm text-[#6B7280] mb-10">
          Maak hier een nieuwe opdracht aan
        </p>

        {/* Form layout only – no functionality yet */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {/* Left column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#111827]">
                Titel
              </label>
              <input
                type="text"
                placeholder="Naam opdracht"
                className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FFE600] focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#111827]">
                Hero afbeelding
              </label>
              {renderUploadPlaceholder()}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#111827]">
                Locatie
              </label>
              <input
                type="text"
                placeholder="Naam locatie"
                className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FFE600] focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#111827]">
                Locatie afbeelding
              </label>
              {renderUploadPlaceholder()}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#111827]">
                Beschrijving
              </label>
              <textarea
                placeholder="Beschrijving"
                className="min-h-[120px] w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FFE600] focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#111827]">
                Inspiratie
              </label>
              <textarea
                placeholder="Beschrijf een inspirerend voorbeeld"
                className="min-h-[120px] w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FFE600] focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#111827]">
                Extra afbeelding
              </label>
              {renderUploadPlaceholder()}
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
                Uploaden →
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
