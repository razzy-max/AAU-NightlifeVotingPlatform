import { NextResponse } from "next/server";
import getPrisma from "../../../../lib/prisma";
import { verifyOpayPayment } from "../../../../lib/opay";

type OpayResponse = {
  status?: string;
  paid?: boolean;
  [key: string]: unknown;
};

// This endpoint receives webhook callbacks from the payment provider.
// It verifies the payment and, if successful, creates Vote rows based on the payment.votes value.
export async function POST(req: Request) {
  const body = await req.json();
  const reference = body.reference || body.data?.reference;
  if (!reference) return NextResponse.json({ error: "no reference" }, { status: 400 });

  // Verify with provider (best-effort)
  try {
  const provider = (await verifyOpayPayment(reference)) as OpayResponse;
  const status = provider?.status ?? body.status ?? "unknown";

  const prisma = await getPrisma();
  const payment = await prisma.payment.findUnique({ where: { reference } });
    if (!payment) return NextResponse.json({ error: "payment not found" }, { status: 404 });

  const providerPaid = provider?.paid === true || status === "completed" || status === "success";

    if (providerPaid) {
      // mark payment completed
  await prisma.payment.update({ where: { id: payment.id }, data: { status: "completed", meta: { provider } } });

      // create votes
      const voteCount = payment.votes || 1;
      const createVotes = Array.from({ length: voteCount }).map(() => ({ candidateId: payment.candidateId, paymentId: payment.id }));
  await prisma.vote.createMany({ data: createVotes });

      return NextResponse.json({ ok: true });
    } else {
  await prisma.payment.update({ where: { id: payment.id }, data: { status: "failed", meta: { provider } } });
      return NextResponse.json({ ok: false, status });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
