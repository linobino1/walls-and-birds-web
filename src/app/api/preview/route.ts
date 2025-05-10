import { getPayload } from '@/util/getPayload'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * if the user is authenticated, this will enable draft mode and redirect to the path that is passed in the query string
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const payload = await getPayload()
  const path = searchParams.get('path')

  const { user } = await payload.auth(req)
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  if (!path) {
    return new Response('Missing path', { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(path)
}
