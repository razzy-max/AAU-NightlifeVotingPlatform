import getPrisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const prisma = await getPrisma();
  const cands = await prisma.candidate.findMany({ include: { votes: true, category: true } });
  return NextResponse.json(cands);
}

export async function POST(req: Request) {
  const body = await req.json();
  const prisma = await getPrisma();
  if (!body.name || !body.slug || !body.categoryId) return NextResponse.json({ error: 'name, slug, categoryId required' }, { status: 400 });
  const cand = await prisma.candidate.create({ data: { name: body.name, slug: body.slug, description: body.description || null, image: body.image || null, categoryId: body.categoryId } });
  return NextResponse.json(cand);
}
