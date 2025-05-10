import type { CollectionConfig } from 'payload'
import { Content } from '@/blocks/Content/config'
import { RawHTML } from '@/blocks/RawHTML/config'
import { slugField } from '@/fields/slug'
import { publicReadOnly } from '@/util/access/publicReadOnly'
import { Gallery } from '@/blocks/Gallery/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: publicReadOnly,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField('title'),
    {
      name: 'hero',
      type: 'radio',
      options: ['heading', 'none'],
      defaultValue: 'heading',
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [Content, Gallery, RawHTML],
      required: true,
    },
  ],
}
