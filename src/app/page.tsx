"use client";
import React, { useEffect, useState } from "react";

type Candidate = { id: number; name: string; votes?: number; image?: string; slug?: string; categoryId?: number };

export default function Home() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/votes')
      .then(r => r.json())
      .then(d => {
        // flatten categories -> candidates
        const all: Candidate[] = [];
        (d.categories || []).forEach((cat: any) => {
          cat.candidates.forEach((c: any) => all.push({ ...c, categoryId: cat.id }));
        });
        setCandidates(all);
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

  if (loading) return <div className="p-8">Loading candidates…</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">AAU Nightlife Headies - Vote</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {candidates.map(c => (
          <div key={c.id} className="p-4 border rounded shadow-sm">
            <div className="flex items-center gap-4">
              {c.image ? <img src={c.image} alt={c.name} className="w-16 h-16 object-cover rounded" /> : <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">No Image</div>}
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-gray-600">{c.votes ?? 0} votes</div>
              </div>
            </div>
            <div className="mt-4">
              <button onClick={() => onVote(c.id)} className="px-3 py-1 bg-blue-600 text-white rounded">Vote (100 NGN)</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <a href="/leaderboard" className="text-blue-600 underline">View leaderboard</a>
      </div>
    </div>
  );
}
