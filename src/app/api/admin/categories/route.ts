import getPrisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const prisma = await getPrisma();
  const cats = await prisma.category.findMany({ include: { candidates: true } });
  return NextResponse.json(cats);
}

export async function POST(req: Request) {
  const body = await req.json();
  const prisma = await getPrisma();
  if (!body.name) return NextResponse.json({ error: 'name required' }, { status: 400 });
  const cat = await prisma.category.create({ data: { name: body.name } });
  return NextResponse.json(cat);
}
