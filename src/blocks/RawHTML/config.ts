import { Block } from 'payload'

export const RawHTML: Block = {
  slug: 'html',
  interfaceName: 'RawHTMLBlock',
  fields: [
    {
      name: 'html',
      type: 'textarea',
      required: true,
      localized: true,
    },
  ],
}
