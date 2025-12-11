"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export default function LoginPage() {
  // State variables for team code and error message
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Fetch team login data from API
    const res = await fetch("/api/auth/team-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    // Parse response data
    const data = await res.json();

    // If response is not ok, set error message
    if (!res.ok) {
      setError(data.error || "Er ging iets mis");
      return;
    }

    // tore team info in localStorage for now (Comment if not used anymore)
    // localStorage.setItem("team", JSON.stringify(data));

    // Redirect user to dashboard
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen w-full bg-[#EDE6DC] flex flex-col items-center justify-center px-6 py-10">
      {/* Logo */}
      <div className="w-full max-w-xs mb-20 mt-8 md:absolute md:top-6 md:left-6">
        <img src="/logo.png" alt="NexEd" className="w-32" />
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#2C2C2C]">Bit Bingo</h1>
        <p className="text-lg text-[#2C2C2C] mt-1">Ontgrendel Groningen</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <div className="space-y-1">
          <Label htmlFor="teamcode" className="sr-only">
            Teamcode
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2C2C2C]" />
            <Input
              id="teamcode"
              placeholder="Voer teamcode in"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="pl-10 bg-white/60 border-none text-[#2C2C2C] placeholder-[#2C2C2C]"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm font-semibold">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-[#FFE600] text-[#2C2C2C] font-semibold hover:bg-[#2C2C2C] hover:text-[#FFE600]"
        >
          Log in →
        </Button>
      </form>
    </main>
  );
}
