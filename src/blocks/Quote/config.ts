import { Block } from 'payload'

export const Quote: Block = {
  slug: 'quote',
  labels: {
    singular: 'Press Quote',
    plural: 'Press Quotes',
  },
  interfaceName: 'QuoteBlock',
  fields: [
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
