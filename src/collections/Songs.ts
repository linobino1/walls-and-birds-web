import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { publicReadOnly } from '@/util/access/publicReadOnly'
import { revalidatePath } from '@/util/revalidate'

export const Songs: CollectionConfig = {
  slug: 'songs',
  admin: {
    defaultColumns: ['title', 'updatedAt'],
    listSearchableFields: ['title', 'content'],
  },
  access: publicReadOnly,
  hooks: {
    afterChange: [
      async ({ doc }) => {
        revalidatePath('/songbook')
        revalidatePath(`/songbook/${doc.slug}`)
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
      admin: {},
    },
    ...slugField('title'),
    {
      name: 'key',
      type: 'text',
      required: true,
    },
    {
      name: 'by',
      type: 'text',
      required: true,
      defaultValue: 'Walls & Birds',
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
  ],
}
