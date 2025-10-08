"use client";
import React, { useEffect, useState } from "react";

type Category = { id: number; name: string };

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [catName, setCatName] = useState("");
  const [candName, setCandName] = useState("");
  const [candSlug, setCandSlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(r => r.json())
      .then(d => setCategories(d))
      .finally(() => setLoading(false));
  }, []);

  async function createCategory(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: catName }) });
    setCatName('');
    const res = await fetch('/api/admin/categories');
    setCategories(await res.json());
  }

  async function createCandidate(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCategory) return alert('Select category');
    await fetch('/api/admin/candidates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: candName, slug: candSlug, categoryId: selectedCategory }) });
    setCandName(''); setCandSlug('');
    const res = await fetch('/api/admin/categories');
    setCategories(await res.json());
  }

  if (loading) return <div className="p-8">Loading admin…</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin</h1>

      <section className="mb-8">
        <h2 className="font-semibold">Create Category</h2>
        <form onSubmit={createCategory} className="mt-2 flex gap-2">
          <input value={catName} onChange={e => setCatName(e.target.value)} placeholder="Category name" className="px-2 py-1 border rounded" />
          <button className="px-3 py-1 bg-green-600 text-white rounded">Create</button>
        </form>
      </section>

      <section>
        <h2 className="font-semibold">Create Candidate</h2>
        <form onSubmit={createCandidate} className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input value={candName} onChange={e => setCandName(e.target.value)} placeholder="Candidate name" className="px-2 py-1 border rounded col-span-1 sm:col-span-1" />
          <input value={candSlug} onChange={e => setCandSlug(e.target.value)} placeholder="slug" className="px-2 py-1 border rounded col-span-1 sm:col-span-1" />
          <select value={selectedCategory ?? ''} onChange={e => setSelectedCategory(e.target.value ? Number(e.target.value) : null)} className="px-2 py-1 border rounded">
            <option value="">Select category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className="sm:col-span-3">
            <button className="px-3 py-1 bg-blue-600 text-white rounded">Create Candidate</button>
          </div>
        </form>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Existing Categories</h2>
        <ul className="mt-2">
          {categories.map(cat => (
            <li key={cat.id} className="py-1">{cat.name} ({(cat as any).candidates?.length ?? 0} candidates)</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
