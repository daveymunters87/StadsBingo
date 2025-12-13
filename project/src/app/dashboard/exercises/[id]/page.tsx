"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Menu, Upload, ArrowRight, X } from "lucide-react";

interface TeamData {
  teamId: string;
  teamName: string;
  captainId: string | null;
  players: Array<{ id: string; name: string }>;
}

interface ExerciseDetail {
  id: string;
  title: string;
  description: string;
  location: string;
  order: number;
  status: "LOCKED" | "AVAILABLE" | "PENDING" | "FEEDBACK" | "APPROVED";
  submission: {
    id: string;
    answerText: string | null;
    answerImage: string | null;
    status: string;
    feedback: string | null;
    createdAt: string;
  } | null;
}

export default function ExerciseDetailPage() {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [exercise, setExercise] = useState<ExerciseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useParams();
  const exerciseId = params.id as string;

  useEffect(() => {
    const stored = localStorage.getItem("teamData");
    if (!stored) {
      router.push("/team-login");
      return;
    }

    try {
      const data = JSON.parse(stored);
      setTeamData(data);

      // Fetch exercise details
      fetch(`/api/exercises/${data.teamId}/${exerciseId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Exercise not found");
          }
          return res.json();
        })
        .then((exerciseData) => {
          setExercise(exerciseData);
          if (exerciseData.submission?.answerImage) {
            setUploadedImage(exerciseData.submission.answerImage);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching exercise:", error);
          router.push("/dashboard/exercises");
        });
    } catch {
      router.push("/team-login");
    }
  }, [router, exerciseId]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!uploadedImage || !teamData || !exercise) return;

    setSubmitting(true);
    try {
      // TODO: Implement actual submission API
      // For now, just show success message
      alert("Opdracht ingeleverd!");
      router.push("/dashboard/exercises");
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Er ging iets mis bij het inleveren");
    } finally {
      setSubmitting(false);
    }
  };

  if (!teamData || loading) {
    return (
      <div className="min-h-screen bg-[#EDE6DC] flex items-center justify-center">
        <p className="text-[#2C2C2C]">Laden...</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen bg-[#EDE6DC] flex items-center justify-center">
        <p className="text-[#2C2C2C]">Opdracht niet gevonden</p>
      </div>
    );
  }

  const hasSubmission = exercise.submission !== null;
  const submissionStatus = exercise.submission?.status || "Niet ingeleverd";

  return (
    <main className="min-h-screen bg-[#EDE6DC] pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-6">
      <div className="w-full max-w-xs mb-6 mt-8 md:absolute">
        <Image src="/logo.png" alt="NexEd" width={128} height={128} />
      </div>
        <button
          type="button"
          className="text-[#2C2C2C] p-2 md:hidden"
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Hero Image with Tag - Full Width */}
      <div className="relative w-full h-64 md:h-80 mb-6">
        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          <span className="text-[#2C2C2C]/40 text-lg">Hero Image</span>
        </div>
        <div className="absolute bottom-4 left-4 md:left-6 bg-[#FFE600] rounded-xl px-5 py-2.5">
          <span className="text-[#2C2C2C] font-bold text-xl">
            Opdracht {exercise.order}
          </span>
        </div>
      </div>

      <div className="px-4 md:px-6 md:max-w-2xl md:mx-auto">
        {/* Beschrijving Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-[#2C2C2C] mb-3">Beschrijving</h2>
          <p className="text-base text-[#2C2C2C] font-light leading-relaxed">
            {exercise.description}
          </p>
        </section>

        {/* Locatie Section */}
        <section className="mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C2C2C] mb-3">
            Locatie: {exercise.location}
          </h2>
            <div className="w-full h-48 bg-gray-100 rounded-xl relative overflow-hidden">
            </div>
          </div>
          
        </section>

        {/* Inspiratie Section */}
        <section className="mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C2C2C] mb-3">Inspiratie</h2>
            <div className="w-full h-48 bg-gray-100 rounded-xl mb-3 flex items-center justify-center">
            </div>
            <p className="text-sm text-[#2C2C2C]">
              Probeer verschillende poses uit en wees creatief met je compositie!
            </p>
          </div>
        </section>

        {/* Upload Section */}
        <section className="mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C2C2C] mb-3">
            Lever hier je foto in
          </h2>
          <div
            className="bg-gray-100 rounded-2xl p-8 border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400 transition-colors min-h-[200px] flex items-center justify-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {uploadedImage ? (
              <div className="relative w-full h-64 rounded-xl overflow-hidden group">
                <Image
                  src={uploadedImage}
                  alt="Uploaded"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-[#2C2C2C] text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                  aria-label="Verwijder afbeelding"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="bg-[#2C2C2C] rounded-lg p-3 mb-3">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <p className="text-[#2C2C2C] font-medium">Klik om te uploaden</p>
              </div>
            )}
          </div>
          <p className="text-sm text-[#2C2C2C] mt-3 font-medium">
            Status: {submissionStatus}
          </p>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="mb-12">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C2C2C] mb-3">
            Eventuele feedback
          </h2>
          <div className="bg-gray-100 rounded-2xl p-4 min-h-[100px]">
            {exercise.submission?.feedback ? (
              <p className="text-base text-[#2C2C2C]">
                {exercise.submission.feedback}
              </p>
            ) : (
              <p className="text-sm text-[#2C2C2C]/60">
                Hier verschijnt feedback van je docent nadat je de opdracht hebt
                ingeleverd.
              </p>
            )}
          </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#EDE6DC] border-t border-gray-300 p-4 md:relative md:border-0 md:p-0 md:mt-6">
          <button
            onClick={handleSubmit}
            disabled={!uploadedImage || submitting || hasSubmission}
            className="w-full bg-[#2C2C2C] text-white rounded-2xl py-4 px-6 font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed md:w-auto md:min-w-[300px]"
          >
            Lever je opdracht in
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-xs text-[#2C2C2C]/60 mt-2 text-center md:text-left">
            Heb je problemen met het inleveren? Neem contact op met een docent
          </p>
        </div>
      </div>
    </main>
  );
}

