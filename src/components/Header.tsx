"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/60 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded flex items-center justify-center text-white font-bold">AH</div>
          <div>
            <Link href="/" className="font-semibold text-lg">AAU Headies</Link>
            <div className="text-xs text-gray-500">Vote for your favorites — 100 NGN / vote</div>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/leaderboard" className="text-sm text-gray-700 hover:text-gray-900">Leaderboard</Link>
          <Link href="/admin" className="text-sm text-gray-700 hover:text-gray-900">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
