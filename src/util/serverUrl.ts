export const serverUrl =
  process.env.SERVER_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (process.env.NEXT_PUBLIC_VERCEL_URL && `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`) ||
  'http://localhost:3000'
