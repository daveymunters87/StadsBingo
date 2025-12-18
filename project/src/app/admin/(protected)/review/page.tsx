"use client";

import { useState, useEffect } from "react";
import StatusFilter from "@/components/admin/ui/StatusFilter";
import AdminLayout from "@/components/admin/AdminLayout";
import PageHeader from "@/components/admin/ui/PageHeader";
import SubmissionsList from "@/components/admin/submissions/SubmissionsList";
import FeedbackModal from "@/components/admin/submissions/FeedbackModal";

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

  const handleApprove = async (submissionId: string) => {
    await handleReview(submissionId, "APPROVED");
  };

  const handleReject = (submission: Submission) => {
    setSelectedSubmission(submission);
  };

  const handleSubmitFeedback = async (submissionId: string, feedbackText: string) => {
    await handleReview(submissionId, "FEEDBACK", feedbackText);
  };

  const handleCloseFeedbackModal = () => {
    setSelectedSubmission(null);
    setFeedback("");
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

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <PageHeader title="Inzendingen Beoordelen" subtitle="Bekijk en beoordeel team inzendingen" />

        <StatusFilter
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: "", label: "Alle" },
            { value: "PENDING", label: "Wachtend" },
            { value: "APPROVED", label: "Goedgekeurd" },
            { value: "FEEDBACK", label: "Feedback" },
          ]}
        />

        <SubmissionsList
          submissions={submissions}
          loading={loading}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        <FeedbackModal
          selectedSubmission={selectedSubmission}
          feedback={feedback}
          setFeedback={setFeedback}
          onSubmitFeedback={handleSubmitFeedback}
          onClose={handleCloseFeedbackModal}
        />
      </div>
    </AdminLayout>
  );
}