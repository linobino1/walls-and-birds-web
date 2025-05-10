import { defaultLexical } from '@/seed/util/defaultLexical'
import { Block } from 'payload'

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: defaultLexical,
      label: false,
      required: true,
      localized: true,
    },
  ],
}
