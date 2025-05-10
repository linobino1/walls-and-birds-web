'use server'

/**
 * trigger a wakeup call to listmonk
 */
export const listmonkWakeUp = async () => {
  const wakeUpResponse = await fetch(process.env.NEXT_PUBLIC_LISTMONK_URL!)
  if (!wakeUpResponse.ok) {
    console.error('Listmonk is not reachable')
  }
}
