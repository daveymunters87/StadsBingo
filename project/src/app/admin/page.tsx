"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

export default function TeacherDashboard() {
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent submissions
        const submissionsResponse = await fetch('/api/admin/submissions?status=PENDING', {
          credentials: 'include'
        });
        if (submissionsResponse.ok) {
          const submissionsData = await submissionsResponse.json();
          setRecentSubmissions(submissionsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
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
              {loading ? (
                <div className="bg-white rounded-2xl border border-[#E5E7EB] px-5 py-4 text-center">
                  <p className="text-[#6B7280]">Inzendingen laden...</p>
                </div>
              ) : recentSubmissions.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#E5E7EB] px-5 py-4 text-center">
                  <p className="text-[#6B7280]">Geen recente inzendingen</p>
                </div>
              ) : (
                recentSubmissions.slice(0, 4).map((submission: any) => (
                  <div
                    key={submission.id}
                    className="bg-white rounded-2xl border border-[#E5E7EB] px-5 py-4 flex items-center justify-between shadow-sm hover:shadow-md hover:border-[#D1D5DB] transition group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-[#111827]">
                          {submission.assignment.title} - {submission.team.name}
                        </h3>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-current">
                          Review
                        </span>
                      </div>
                      <p className="text-sm text-[#6B7280]">
                        Ingeleverd: {new Date(submission.createdAt).toLocaleDateString('nl-NL')}
                      </p>
                    </div>
                    <Link href="/admin/review" className="ml-4">
                      <div className="w-8 h-8 bg-[#111827] rounded-full flex items-center justify-center transition group-hover:bg-black group-hover:scale-105">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    </Link>
                  </div>
                ))
              )}

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
              {/* Teams Beheren */}
              <Link
                href="/admin/teams"
                className="w-full bg-white rounded-2xl border border-[#E5E7EB] px-5 py-4 flex items-center justify-between hover:shadow-md hover:border-[#D1D5DB] transition shadow-sm"
              >
                <span className="font-medium text-[#111827]">
                  Teams Beheren
                </span>
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </Link>

              {/* Opdrachten Beheren */}
              <Link
                href="/admin/assignments"
                className="w-full bg-white rounded-2xl border border-[#E5E7EB] px-5 py-4 flex items-center justify-between hover:shadow-md hover:border-[#D1D5DB] transition shadow-sm"
              >
                <span className="font-medium text-[#111827]">
                  Opdrachten Beheren
                </span>
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </Link>

              {/* Inzendingen Beoordelen */}
              <Link
                href="/admin/review"
                className="w-full bg-white rounded-2xl border border-[#E5E7EB] px-5 py-4 flex items-center justify-between hover:shadow-md hover:border-[#D1D5DB] transition shadow-sm"
              >
                <span className="font-medium text-[#111827]">
                  Inzendingen Beoordelen
                </span>
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </Link>
            </div>
          </div>
        </div>
    </AdminLayout>
  );
}