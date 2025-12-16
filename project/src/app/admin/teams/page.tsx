"use client";

import { useState, useEffect } from "react";

import { Plus, Trash2, Edit, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminLayout from "@/components/AdminLayout";

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
    playerNames: ["", "", "", "", ""] // Default 5 players
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/admin/teams", {
        credentials: 'include'
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
    
    const playerNames = formData.playerNames.filter(name => name.trim() !== "");
    if (!formData.name.trim() || playerNames.length === 0) {
      alert("Team name and at least one player are required");
      return;
    }

    try {
      const url = editingTeam ? `/api/admin/teams/${editingTeam.id}` : "/api/admin/teams";
      const method = editingTeam ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          playerNames
        })
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
        credentials: 'include'
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
        ...team.players.map(p => p.name),
        ...Array(Math.max(0, 5 - team.players.length)).fill("")
      ]
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
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Teams Beheren</h1>
          <p className="text-[#4B5563]">Maak en beheer teams voor StadsBingo</p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex gap-4">
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingTeam(null);
              setFormData({ name: "", playerNames: ["", "", "", "", ""] });
            }}
            className="bg-[#FFE600] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#FFE600]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nieuw Team
          </Button>
          {showForm && (
            <Button
              onClick={resetForm}
              variant="outline"
            >
              <X className="h-4 w-4 mr-2" />
              Annuleren
            </Button>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form Column */}
          <div className="lg:col-span-1">
            {showForm && (
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-4">
                <h2 className="text-xl font-bold text-[#2C2C2C] mb-4">
                  {editingTeam ? "Team Bewerken" : "Nieuw Team"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="teamName">Team Naam</Label>
                    <Input
                      id="teamName"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Voer team naam in"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Spelers</Label>
                    <div className="space-y-2 mt-1">
                      {formData.playerNames.map((name, index) => (
                        <Input
                          key={index}
                          value={name}
                          onChange={(e) => {
                            const newNames = [...formData.playerNames];
                            newNames[index] = e.target.value;
                            setFormData({ ...formData, playerNames: newNames });
                          }}
                          placeholder={`Speler ${index + 1} naam`}
                        />
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#FFE600] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#FFE600]">
                    {editingTeam ? "Bijwerken" : "Aanmaken"}
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Teams List Column */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-[#2C2C2C]">Teams laden...</p>
              </div>
            ) : teams.length === 0 ? (
              <div className="bg-[#F5F0E8] rounded-2xl p-6 text-center">
                <Users className="h-12 w-12 text-[#2C2C2C] mx-auto mb-4" />
                <p className="text-[#2C2C2C]">Geen teams gevonden</p>
                <p className="text-[#6B7280] text-sm mt-2">Klik op "Nieuw Team" om je eerste team aan te maken</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {teams.map((team) => (
                  <div key={team.id} className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-[#2C2C2C]">{team.name}</h3>
                        <p className="text-sm text-[#6B7280]">Code: {team.code}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => startEdit(team)}
                          className="p-2 text-[#6B7280] hover:text-[#2C2C2C] hover:bg-[#F5F0E8] rounded-lg"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(team.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <Users className="h-4 w-4" />
                        <span>{team._count.players} spelers</span>
                      </div>
                      
                      {team.captain && (
                        <p className="text-sm text-[#6B7280]">
                          Kapitein: {team.captain.name}
                        </p>
                      )}
                      
                      <p className="text-sm text-[#6B7280]">
                        {team._count.submissions} inzendingen
                      </p>
                      
                      <div className="pt-2 border-t">
                        <p className="text-xs text-[#9CA3AF]">
                          Aangemaakt door: {team.createdBy.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}