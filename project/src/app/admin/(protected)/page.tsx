"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import PageHeader from "@/components/admin/ui/PageHeader";
import RecentSubmissions from "@/components/admin/dashboard/RecentSubmissions";
import ManageSection from "@/components/admin/dashboard/ManageSection";

export default function TeacherDashboard() {
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      <div className="max-w-6xl mx-auto">
        <PageHeader title="Dashboard" subtitle="Beheersysteem voor de BitBingo" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <RecentSubmissions submissions={recentSubmissions} loading={loading} />
          <ManageSection />
        </div>
      </div>
    </AdminLayout>
  );
}
