import type { CollectionConfig } from 'payload'
import { revalidatePath } from '@/util/revalidate'

export const Shows: CollectionConfig = {
  slug: 'shows',
  admin: {
    defaultColumns: ['date', 'location'],
  },
  defaultSort: '-date',
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
