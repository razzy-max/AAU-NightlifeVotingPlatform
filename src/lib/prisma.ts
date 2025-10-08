let _prisma: any = undefined;

export async function getPrisma() {
  if (_prisma) return _prisma;
  const { PrismaClient } = await import("@prisma/client");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - attaching to global for dev reuse
  const g: any = globalThis;
  _prisma = g.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== "production") {
    g.prisma = _prisma;
  }
  return _prisma;
}

export default getPrisma;
