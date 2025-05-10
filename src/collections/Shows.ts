import type { CollectionConfig } from 'payload'
import { publicReadOnly } from '@/util/access/publicReadOnly'
import { revalidatePath } from 'next/cache'

export const Shows: CollectionConfig = {
  slug: 'shows',
  admin: {
    defaultColumns: ['date', 'location'],
  },
  access: publicReadOnly,
  hooks: {
    afterChange: [
      async () => {
        revalidatePath('/')
        revalidatePath('/past-shows')
      },
    ],
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'link',
      type: 'text',
      required: false,
    },
  ],
}
