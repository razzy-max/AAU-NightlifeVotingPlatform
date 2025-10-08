import type { PrismaClient } from "@prisma/client";

let _prisma: PrismaClient | undefined = undefined;

interface GlobalWithPrisma {
  prisma?: PrismaClient;
}

export async function getPrisma() {
  if (_prisma) return _prisma;
  const { PrismaClient } = await import("@prisma/client");
  const g = globalThis as unknown as GlobalWithPrisma;
  _prisma = g.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== "production") {
    g.prisma = _prisma;
  }
  return _prisma;
}

export default getPrisma;
