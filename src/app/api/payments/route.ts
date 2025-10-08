import { NextResponse } from "next/server";
import getPrisma from "../../../lib/prisma";
import { createOpayPayment } from "../../../lib/opay";

export async function POST(req: Request) {
  const body = await req.json();
  const { candidateId, votes } = body;
  const count = Number(votes) || 1;
  if (!candidateId) return NextResponse.json({ error: "candidateId required" }, { status: 400 });

  const amountPerVote = 100; // NGN
  const amount = amountPerVote * count;

  const reference = `headies_${Date.now()}_${Math.floor(Math.random() * 1_000_000)}`;

  const prisma = await getPrisma();

  // Create pending payment record
  const payment = await prisma.payment.create({
    data: {
      reference,
      amount,
      currency: "NGN",
      status: "pending",
      candidateId: candidateId,
      votes: count,
      meta: { requestedAt: new Date().toISOString() },
    },
  });

  // Create payment with provider (Opay)
  try {
    const providerResp = await createOpayPayment({ amount, reference, redirectUrl: body.redirectUrl });
    return NextResponse.json({ payment, provider: providerResp });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    // mark payment failed
    await prisma.payment.update({ where: { id: payment.id }, data: { status: "failed", meta: { error: msg } } });
    return NextResponse.json({ error: "failed to create provider payment", details: msg }, { status: 502 });
  }
}
