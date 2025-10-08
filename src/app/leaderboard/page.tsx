"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Candidate = { id: number; name: string; votes: number; image?: string; slug?: string };
type Category = { id: number; name: string; candidates: Candidate[] };

export default function LeaderboardPage() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/votes")
      .then((r) => r.json())
      .then((d) => setData(d.categories || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading leaderboard…</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Headies Leaderboard</h1>
      {data.map((cat) => (
        <section key={cat.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{cat.name}</h2>
          <ol className="list-decimal pl-6">
            {cat.candidates
              .slice()
              .sort((a, b) => b.votes - a.votes)
              .map((c) => (
                <li key={c.id} className="mb-2">
                  <div className="flex items-center gap-3">
                    {c.image ? (
                      <Image src={c.image} alt={c.name} width={48} height={48} className="object-cover rounded" />
                    ) : null}
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-sm text-gray-600">{c.votes} votes</div>
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
