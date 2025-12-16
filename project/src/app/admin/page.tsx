'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Check } from 'lucide-react';

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

export default function TeacherDashboard() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

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

  // Mock data for assignments (as shown in Figma)
  const mockAssignments = [
    {
      id: 1,
      title: 'Opdracht 1',
      team: 'Team 2',
      date: 'Gisteren 10:32',
      status: 'Review',
      statusColor: 'bg-red-100 text-red-800'
    },
    {
      id: 2,
      title: 'Opdracht 2',
      team: 'Team 3',
      date: 'Gisteren 09:45',
      status: 'Review',
      statusColor: 'bg-red-100 text-red-800'
    },
    {
      id: 3,
      title: 'Opdracht 1',
      team: 'Team 4',
      date: 'Gisteren 10:17',
      status: 'Goedgekeurd',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 4,
      title: 'Opdracht 3',
      team: 'Team 1',
      date: 'Gisteren 14:02',
      status: 'Goedgekeurd',
      statusColor: 'bg-green-100 text-green-800'
    }
  ];

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
        {/* Admin Welcome Section */}
        <div className="bg-[#FFE600] rounded-2xl p-5 mb-10">
          <h2 className="text-2xl font-extrabold text-[#2C2C2C]">Welkom,</h2>
          <p className="text-2xl font-extrabold text-[#2C2C2C]">Admin</p>
        </div>

        {/* Teams Section */}
        <div>
          <h3 className="text-lg font-extrabold text-[#2C2C2C] mb-4">
            Teams
          </h3>
          <div className="space-y-1">
            {loading ? (
              <div className="text-sm text-[#6B7280]">Teams laden...</div>
            ) : teams.length === 0 ? (
              <>
                <div className="flex items-center justify-between py-3 cursor-pointer rounded hover:bg-[#F5F0E8]">
                  <div>
                    <div className="font-medium text-[#111827]">Team 1</div>
                    <div className="text-sm text-[#6B7280] flex items-center gap-1">
                      <span>Done</span>
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between py-3 cursor-pointer rounded hover:bg-[#F5F0E8]">
                  <div>
                    <div className="font-medium text-[#111827]">Team 2</div>
                    <div className="text-sm text-[#6B7280]">Active</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between py-3 cursor-pointer rounded hover:bg-[#F5F0E8]">
                  <div>
                    <div className="font-medium text-[#111827]">Team 3</div>
                    <div className="text-sm text-[#6B7280]">Active</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between py-3 cursor-pointer rounded hover:bg-[#F5F0E8]">
                  <div>
                    <div className="font-medium text-[#111827]">Team 4</div>
                    <div className="text-sm text-[#6B7280]">Active</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between py-3 cursor-pointer rounded hover:bg-[#F5F0E8]">
                  <div>
                    <div className="font-medium text-[#111827]">Team 5</div>
                    <div className="text-sm text-[#9CA3AF]">Not active</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between py-3 cursor-pointer rounded hover:bg-[#F5F0E8]">
                  <div>
                    <div className="font-medium text-[#111827]">Team 6</div>
                    <div className="text-sm text-[#9CA3AF]">Not active</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
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
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 px-6 pt-32 md:pt-26 md:px-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-2">
            Dashboard
          </h1>
          <p className="text-[#4B5563]">
            Beheersysteem voor de BitBingo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Ingeleverde Opdrachten Section */}
          <div>
            <h2 className="text-xl font-semibold text-[#111827] mb-6">
              Ingeleverde opdrachten
            </h2>
            <div className="space-y-4">
              {mockAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-white rounded-2xl border border-[#E5E7EB] px-5 py-4 flex items-center justify-between shadow-sm hover:shadow-md hover:border-[#D1D5DB] transition group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-[#111827]">
                        {assignment.title} - {assignment.team}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${assignment.statusColor} border border-current`}
                      >
                        {assignment.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B7280]">
                      Ingeleverd: {assignment.date}
                    </p>
                  </div>
                  {assignment.status === 'Review' && (
                    <div className="ml-4">
                      <div className="w-8 h-8 bg-[#111827] rounded-full flex items-center justify-center transition group-hover:bg-black group-hover:scale-105">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6">
                <button className="text-sm text-[#4B5563] hover:text-[#111827]">
                  Alle ingeleverde opdrachten →
                </button>
              </div>
            </div>
          </div>

          {/* Beheren Section */}
          <div>
            <h2 className="text-xl font-semibold text-[#111827] mb-6">
              Beheren
            </h2>
            <div className="space-y-4">
              {/* Opdracht toevoegen */}
              <Link
                href="/admin/add-assignment"
                className="w-full bg-white rounded-2xl border border-[#E5E7EB] px-5 py-4 flex items-center justify-between hover:shadow-md hover:border-[#D1D5DB] transition shadow-sm"
              >
                <span className="font-medium text-[#111827]">
                  Opdracht toevoegen
                </span>
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl leading-none pb-1">+</span>
                </div>
              </Link>

              {/* Opdracht wijzigen */}
              <Link
                href="/admin/edit-assignment"
                className="w-full bg-white rounded-2xl border border-[#E5E7EB] px-5 py-4 flex items-center justify-between hover:shadow-md hover:border-[#D1D5DB] transition shadow-sm"
              >
                <span className="font-medium text-[#111827]">
                  Opdracht wijzigen
                </span>
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl leading-none pb-1">+</span>
                </div>
              </Link>

              {/* Team aanmaken */}
              <Link
                href="/admin/create-team"
                className="w-full bg-white rounded-2xl border border-[#E5E7EB] px-5 py-4 flex items-center justify-between hover:shadow-md hover:border-[#D1D5DB] transition shadow-sm"
              >
                <span className="font-medium text-[#111827]">
                  Team aanmaken
                </span>
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl leading-none pb-1">+</span>
                </div>
              </Link>

              {/* Team wijzigen */}
              <Link
                href="/admin/edit-team"
                className="w-full bg-white rounded-2xl border border-[#E5E7EB] px-5 py-4 flex items-center justify-between hover:shadow-md hover:border-[#D1D5DB] transition shadow-sm"
              >
                <span className="font-medium text-[#111827]">
                  Team wijzigen
                </span>
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl leading-none pb-1">+</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}