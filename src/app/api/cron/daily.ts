import { revalidatePath } from '@/util/revalidate'
import type { NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  // revalidate the landing page to ensure that yesterday's shows are removed
  revalidatePath('/')

  return Response.json({ success: true })
}
