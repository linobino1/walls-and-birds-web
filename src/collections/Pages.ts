import type { CollectionConfig } from 'payload'
import { Content } from '@/blocks/Content/config'
import { RawHTML } from '@/blocks/RawHTML/config'
import { slugField } from '@/fields/slug'
import { Gallery } from '@/blocks/Gallery/config'
import { revalidatePath } from '@/util/revalidate'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: {
      autosave: {
        interval: 500,
      },
    },
  },
  hooks: {
    afterChange: [({ doc }) => revalidatePath(`/${doc.slug}`)],
  },
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
