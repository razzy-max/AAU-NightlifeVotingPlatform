This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Headies Voting Platform - additional setup

Environment variables required (create a `.env` file):

- `DATABASE_URL` - Postgres connection string for Prisma
- `OPAY_API_KEY` - Your OPAY API key
- `OPAY_MERCHANT_ID` - Your OPAY merchant id
- `OPAY_BASE_URL` - Optional; defaults to OPAY production base URL
- `OPAY_CALLBACK_URL` - The callback/webhook URL OPAY will call after payment

Database migrations (Prisma):

1. Install dependencies: `npm install`
2. Generate Prisma client: `npx prisma generate`
3. Create migration and push schema: `npx prisma migrate dev --name init`

Webhook setup:

- Configure your OPAY dashboard to call `/api/payments/webhook` on payment events.
- Verify signatures and secret headers per OPAY docs. The example code uses a simple verification call and will need to be adapted to OPAY's recommended webhook verification method.

Notes:

- Each vote costs 100 NGN. The `POST /api/payments` endpoint will create a pending payment record and call OPAY to create the provider payment. After OPAY confirms payment via webhook, Vote rows are created and linked to the payment.
- Payments are stored in the database and only marked `completed` after verification from the provider.
