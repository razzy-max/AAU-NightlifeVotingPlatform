"use client";
import React, { useEffect, useState } from "react";
import CandidateCard from "../../components/CandidateCard";

type Candidate = { id: number; name: string; votes: number; image?: string; slug?: string };
type Category = { id: number; name: string; candidates: Candidate[] };

const PLACEHOLDER: Candidate[] = [
  { id: 101, name: "Sample Artist A", votes: 120 },
  { id: 102, name: "Sample Artist B", votes: 98 },
  { id: 103, name: "Sample Artist C", votes: 76 },
];

export default function LeaderboardPage() {
  const [data, setData] = useState<Category[]>([{ id: 1, name: 'Popular', candidates: PLACEHOLDER }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/votes")
      .then((r) => r.json())
      .then((d) => {
        if (d.categories && d.categories.length) {
          setData(d.categories || []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Headies Leaderboard</h1>
      {data.map((cat) => (
        <section key={cat.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{cat.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.candidates.slice().sort((a,b) => b.votes - a.votes).map(c => (
              <CandidateCard key={c.id} id={c.id} name={c.name} votes={c.votes} image={c.image} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
