import type { CollectionConfig } from 'payload'
import { publicReadOnly } from '@/util/access/publicReadOnly'

export const Media: CollectionConfig = {
  slug: 'media',
  access: publicReadOnly,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
