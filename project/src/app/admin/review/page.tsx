"use client";

import { useState, useEffect } from "react";

import { Check, X, Clock, MessageSquare, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminLayout from "@/components/AdminLayout";

interface Submission {
  id: string;
  answerText: string | null;
  answerImage: string | null;
  status: "PENDING" | "APPROVED" | "FEEDBACK";
  feedback: string | null;
  createdAt: string;
  updatedAt: string;
  team: {
    name: string;
    code: string;
  };
  assignment: {
    title: string;
    order: number;
  };
  player: {
    name: string;
  } | null;
}

export default function SubmissionsReview() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("PENDING");

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter]);

  const fetchSubmissions = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      
      const response = await fetch(`/api/admin/submissions?${params}`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (submissionId: string, status: "APPROVED" | "FEEDBACK", feedbackText?: string) => {
    try {
      const response = await fetch(`/api/admin/submissions/${submissionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          status,
          feedback: feedbackText || null
        })
      });

      if (response.ok) {
        await fetchSubmissions();
        setSelectedSubmission(null);
        setFeedback("");
      } else {
        const error = await response.json();
        alert(error.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error updating submission:", error);
      alert("Something went wrong");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Wachtend</span>;
      case "APPROVED":
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Goedgekeurd</span>;
      case "FEEDBACK":
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Feedback</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Inzendingen Beoordelen</h1>
          <p className="text-[#4B5563]">Bekijk en beoordeel team inzendingen</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[#6B7280]" />
            <Label htmlFor="statusFilter">Status:</Label>
          </div>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFE600] focus:border-transparent"
          >
            <option value="">Alle</option>
            <option value="PENDING">Wachtend</option>
            <option value="APPROVED">Goedgekeurd</option>
            <option value="FEEDBACK">Feedback</option>
          </select>
        </div>

        {/* Submissions List */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-[#2C2C2C]">Inzendingen laden...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-[#F5F0E8] rounded-2xl p-6 text-center">
            <MessageSquare className="h-12 w-12 text-[#2C2C2C] mx-auto mb-4" />
            <p className="text-[#2C2C2C]">Geen inzendingen gevonden</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#2C2C2C]">
                      {submission.assignment.title}
                    </h3>
                    <p className="text-sm text-[#6B7280]">
                      Team: {submission.team.name}
                    </p>
                    {submission.player && (
                      <p className="text-sm text-[#6B7280]">
                        Door: {submission.player.name}
                      </p>
                    )}
                  </div>
                  {getStatusBadge(submission.status)}
                </div>

                {/* Submission Content */}
                <div className="mb-4">
                  {submission.answerText && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-[#2C2C2C] mb-1">Antwoord:</p>
                      <p className="text-sm text-[#6B7280] bg-gray-50 p-2 rounded">
                        {submission.answerText}
                      </p>
                    </div>
                  )}
                  
                  {submission.answerImage && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-[#2C2C2C] mb-1">Foto:</p>
                      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-[#6B7280]">Foto beschikbaar</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Feedback */}
                {submission.feedback && (
                  <div className="mb-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-800 mb-1">Feedback:</p>
                    <p className="text-sm text-red-700">{submission.feedback}</p>
                  </div>
                )}

                {/* Action Buttons */}
                {submission.status === "PENDING" && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleReview(submission.id, "APPROVED")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Goedkeuren
                    </Button>
                    <Button
                      onClick={() => setSelectedSubmission(submission)}
                      variant="outline"
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                      size="sm"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Afwijzen
                    </Button>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t text-xs text-[#9CA3AF]">
                  Ingediend: {new Date(submission.createdAt).toLocaleDateString('nl-NL')}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feedback Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-lg font-bold text-[#2C2C2C] mb-4">
                Feedback geven
              </h3>
              <p className="text-sm text-[#6B7280] mb-4">
                {selectedSubmission.assignment.title} - {selectedSubmission.team.name}
              </p>
              
              <div className="mb-4">
                <Label htmlFor="feedback">Feedback bericht:</Label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Voer feedback in voor het team..."
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFE600] focus:border-transparent"
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleReview(selectedSubmission.id, "FEEDBACK", feedback)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  disabled={!feedback.trim()}
                >
                  Feedback Versturen
                </Button>
                <Button
                  onClick={() => {
                    setSelectedSubmission(null);
                    setFeedback("");
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Annuleren
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}