import { NextResponse } from "next/server";
import getPrisma from "../../../lib/prisma";

export async function GET() {
  // Return categories with candidates and vote counts
  const prisma = await getPrisma();
  const categories = await prisma.category.findMany({
    include: {
      candidates: {
        include: {
          votes: true,
        },
      },
    },
  });
  type Cat = {
    id: number;
    name: string;
    candidates: Array<{
      id: number;
      name: string;
      slug?: string;
      image?: string;
      votes?: unknown[];
    }>;
  };

  const result = (categories as Cat[]).map((cat) => ({
    id: cat.id,
    name: cat.name,
    candidates: cat.candidates.map((cd) => ({
      id: cd.id,
      name: cd.name,
      slug: cd.slug,
      votes: (cd.votes || []).length,
      image: cd.image,
    })),
  }));

  return NextResponse.json({ categories: result });
}
