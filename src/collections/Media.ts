import type { CollectionConfig } from 'payload'
import { publicReadOnly } from '@/util/access/publicReadOnly'

export const Media: CollectionConfig = {
  slug: 'media',
  access: publicReadOnly,
  upload: true,
  fields: [],
}
