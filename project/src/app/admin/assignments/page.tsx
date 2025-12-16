"use client";

import { useState, useEffect } from "react";

import { Plus, Trash2, Edit, BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import AdminLayout from "@/components/AdminLayout";

interface Assignment {
  id: string;
  title: string;
  description: string;
  location: string;
  order: number;
  createdAt: string;
  _count: {
    submissions: number;
    teams: number;
  };
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    order: ""
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch("/api/admin/assignments", {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setAssignments(data);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim() || !formData.order.trim()) {
      alert("Alle velden zijn verplicht");
      return;
    }

    try {
      const url = editingAssignment ? `/api/admin/assignments/${editingAssignment.id}` : "/api/admin/assignments";
      const method = editingAssignment ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          order: parseInt(formData.order)
        })
      });

      if (response.ok) {
        await fetchAssignments();
        resetForm();
      } else {
        const error = await response.json();
        alert(error.error || "Er is iets misgegaan");
      }
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Er is iets misgegaan");
    }
  };

  const handleDelete = async (assignmentId: string) => {
    if (!confirm("Weet je zeker dat je deze opdracht wilt verwijderen?")) return;

    try {
      const response = await fetch(`/api/admin/assignments/${assignmentId}`, {
        method: "DELETE",
        credentials: 'include'
      });

      if (response.ok) {
        await fetchAssignments();
      } else {
        alert("Kon opdracht niet verwijderen");
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
      alert("Er is iets misgegaan");
    }
  };

  const startEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      title: assignment.title,
      description: assignment.description,
      location: assignment.location,
      order: assignment.order.toString()
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingAssignment(null);
    setFormData({ title: "", description: "", location: "", order: "" });
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Opdrachten Beheren</h1>
          <p className="text-[#4B5563]">Maak en beheer opdrachten voor StadsBingo</p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex gap-4">
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingAssignment(null);
              setFormData({ title: "", description: "", location: "", order: "" });
            }}
            className="bg-[#FFE600] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#FFE600]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Opdracht
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
                  {editingAssignment ? "Opdracht Bewerken" : "Nieuwe Opdracht"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titel</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Voer opdracht titel in"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Beschrijving</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Voer opdracht beschrijving in"
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Locatie</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Voer locatie in"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="order">Volgorde</Label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                      placeholder="Voer volgorde nummer in"
                      className="mt-1"
                      min="1"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#FFE600] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#FFE600]">
                    {editingAssignment ? "Bijwerken" : "Aanmaken"}
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Assignments List Column */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-[#2C2C2C]">Opdrachten laden...</p>
              </div>
            ) : assignments.length === 0 ? (
              <div className="bg-[#F5F0E8] rounded-2xl p-6 text-center">
                <BookOpen className="h-12 w-12 text-[#2C2C2C] mx-auto mb-4" />
                <p className="text-[#2C2C2C]">Geen opdrachten gevonden</p>
                <p className="text-[#6B7280] text-sm mt-2">Klik op "Nieuwe Opdracht" om je eerste opdracht aan te maken</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-[#2C2C2C]">{assignment.title}</h3>
                          <span className="px-2 py-1 bg-[#FFE600] text-[#2C2C2C] text-xs font-medium rounded-full">
                            #{assignment.order}
                          </span>
                        </div>
                        <p className="text-sm text-[#6B7280] mb-2">{assignment.description}</p>
                        <p className="text-sm text-[#6B7280]">
                          <strong>Locatie:</strong> {assignment.location}
                        </p>
                      </div>
                      <div className="flex gap-1 ml-4">
                        <button
                          onClick={() => startEdit(assignment)}
                          className="p-2 text-[#6B7280] hover:text-[#2C2C2C] hover:bg-[#F5F0E8] rounded-lg"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(assignment.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-[#6B7280] pt-2 border-t">
                      <span>{assignment._count.teams} teams toegewezen</span>
                      <span>{assignment._count.submissions} inzendingen</span>
                      <span className="text-xs">
                        Aangemaakt: {new Date(assignment.createdAt).toLocaleDateString('nl-NL')}
                      </span>
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