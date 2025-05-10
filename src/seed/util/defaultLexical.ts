import { Article } from '@/blocks/Article/config'
import { Quote } from '@/blocks/Quote/config'
import { BlocksFeature, lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical'

export const defaultLexical = lexicalEditor({
  features({ defaultFeatures }) {
    return [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [Quote, Article],
      }),
      LinkFeature({
        enabledCollections: ['pages'],
      }),
    ]
  },
})
