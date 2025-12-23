"use client";

import { useState, useEffect } from "react";
import ActionButtons from "@/components/admin/ui/ActionButtons";
import AdminLayout from "@/components/admin/AdminLayout";
import PageHeader from "@/components/admin/ui/PageHeader";
import TeamListColumn from "@/components/admin/teams/TeamListColumn";
import TeamFormModal from "@/components/admin/teams/TeamFormModal";

interface Team {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  captain?: {
    name: string;
  };
  players: Array<{
    id: string;
    name: string;
  }>;
  createdBy: {
    name: string;
    email: string;
  };
  _count: {
    players: number;
    submissions: number;
  };
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    playerNames: ["", "", "", "", ""], // Default 5 players
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/admin/teams", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setTeams(data);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const playerNames = formData.playerNames.filter(
      (name) => name.trim() !== "",
    );
    if (!formData.name.trim() || playerNames.length === 0) {
      alert("Team name and at least one player are required");
      return;
    }

    try {
      const url = editingTeam
        ? `/api/admin/teams/${editingTeam.id}`
        : "/api/admin/teams";
      const method = editingTeam ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          playerNames,
        }),
      });

      if (response.ok) {
        await fetchTeams();
        resetForm();
      } else {
        const error = await response.json();
        alert(error.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving team:", error);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (teamId: string) => {
    if (!confirm("Are you sure you want to delete this team?")) return;

    try {
      const response = await fetch(`/api/admin/teams/${teamId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        await fetchTeams();
      } else {
        alert("Failed to delete team");
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("Something went wrong");
    }
  };

  const startEdit = (team: Team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      playerNames: [
        ...team.players.map((p) => p.name),
        ...Array(Math.max(0, 5 - team.players.length)).fill(""),
      ],
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingTeam(null);
    setFormData({ name: "", playerNames: ["", "", "", "", ""] });
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Teams Beheren"
          subtitle="Maak en beheer teams voor StadsBingo"
        />

        <ActionButtons
          onAdd={() => {
            setShowForm(true);
            setEditingTeam(null);
            setFormData({ name: "", playerNames: ["", "", "", "", ""] });
          }}
          onCancel={resetForm}
          showCancel={false}
          addLabel="Nieuw Team"
        />

        {/* Teams List - Full Width */}
        <TeamListColumn
          teams={teams}
          loading={loading}
          onEdit={startEdit}
          onDelete={handleDelete}
        />

        {/* Team Form Modal */}
        <TeamFormModal
          showForm={showForm}
          editingTeam={editingTeam}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={resetForm}
        />
      </div>
    </AdminLayout>
  );
}
