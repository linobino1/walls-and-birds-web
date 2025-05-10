import { revalidatePath as nextRevalidatePath } from 'next/cache'

export const revalidatePath: typeof nextRevalidatePath = (args) => {
  if (process.env.SEED === 'true') return
  nextRevalidatePath(args)
}
