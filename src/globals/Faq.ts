import type { GlobalConfig } from 'payload'
import { revalidatePath } from '@/util/revalidate'

export const Faq: GlobalConfig = {
  slug: 'faq',
  hooks: {
    afterChange: [() => revalidatePath('/faq')],
  },
  fields: [
    {
      name: 'questions',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
        },
      ],
      required: true,
    },
  ],
}
