import type { GlobalConfig } from 'payload'
import { publicReadOnlyGlobal } from '@/util/access/publicReadOnly'
import { revalidatePath } from '@/util/revalidate'

export const Faq: GlobalConfig = {
  slug: 'faq',
  access: publicReadOnlyGlobal,
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
