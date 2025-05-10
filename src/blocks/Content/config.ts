import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
      label: false,
      required: true,
      localized: true,
    },
  ],
}
