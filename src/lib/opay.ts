// Minimal OPAY helper - this file contains placeholders and a small wrapper
// You'll need to populate OPAY_API_KEY and OPAY_MERCHANT_ID in env vars

import axios from "axios";

const OPAY_BASE = process.env.OPAY_BASE_URL ?? "https://api.opayweb.com";
const API_KEY = process.env.OPAY_API_KEY ?? "";
const MERCHANT_ID = process.env.OPAY_MERCHANT_ID ?? "";

export async function createOpayPayment({ amount, currency = "NGN", reference, redirectUrl }: { amount: number; currency?: string; reference: string; redirectUrl?: string; }) {
  // OPAY specifics vary by integration. This is a placeholder showing how you might call
  // their create payment endpoint. Replace path and payload per OPAY docs.
  const payload = {
    merchantId: MERCHANT_ID,
    amount,
    currency,
    reference,
    callbackUrl: process.env.OPAY_CALLBACK_URL,
    redirectUrl,
  };

  const res = await axios.post(`${OPAY_BASE}/payments`, payload, {
    headers: { Authorization: `Bearer ${API_KEY}` },
    timeout: 10_000,
  });

  return res.data;
}

export async function verifyOpayPayment(reference: string) {
  const res = await axios.get(`${OPAY_BASE}/payments/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
    timeout: 10_000,
  });
  return res.data;
}

export const opay = { createOpayPayment, verifyOpayPayment };

export default opay;
