"use client";
import React from "react";

type Props = {
  id: number;
  name: string;
  votes?: number;
  image?: string;
  onVote?: (id: number) => void;
};

export default function CandidateCard({ id, name, votes = 0, image, onVote }: Props) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          {image ? <img src={image} alt={name} className="w-full h-full object-cover" /> : <div className="text-sm text-gray-500">No Image</div>}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-lg">{name}</div>
          <div className="text-sm text-gray-500">{votes} votes</div>
        </div>
        <div>
          <button onClick={() => onVote?.(id)} className="px-3 py-1 bg-indigo-600 text-white rounded">Vote</button>
        </div>
      </div>
    </div>
  );
}
