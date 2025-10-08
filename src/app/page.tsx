"use client";
import React, { useEffect, useState } from "react";
import CandidateCard from "../components/CandidateCard";

type Candidate = { id: number; name: string; votes?: number; image?: string; slug?: string; categoryId?: number };

const PLACEHOLDER: Candidate[] = [
  { id: 1, name: "Sample Artist A", votes: 120, image: "" },
  { id: 2, name: "Sample Artist B", votes: 98, image: "" },
  { id: 3, name: "Sample Artist C", votes: 76, image: "" },
  { id: 4, name: "Sample Artist D", votes: 45, image: "" },
];

export default function Home() {
  const [candidates, setCandidates] = useState<Candidate[]>(PLACEHOLDER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/votes')
      .then(r => r.json())
      .then(d => {
        const all: Candidate[] = [];
        (d.categories || []).forEach((cat: any) => {
          cat.candidates.forEach((c: any) => all.push({ ...c, categoryId: cat.id }));
        });
        if (all.length) setCandidates(all);
      })
      .finally(() => setLoading(false));
  }, []);

  async function onVote(candidateId: number) {
    const votes = 1;
    const res = await fetch('/api/payments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ candidateId, votes }) });
    const data = await res.json();
    alert('Payment created (placeholder). Check server logs or provider for redirection URL.');
    console.log(data);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">AAU Nightlife Headies — Vote</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((c) => (
          <CandidateCard key={c.id} id={c.id} name={c.name} votes={c.votes} image={c.image} onVote={onVote} />
        ))}
      </div>

      <div className="mt-8">
        <a href="/leaderboard" className="text-indigo-600 underline">View leaderboard</a>
      </div>
    </div>
  );
}
