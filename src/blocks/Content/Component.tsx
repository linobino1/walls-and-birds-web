import type { ContentBlock } from '@/payload-types'
import { RichText } from '@/components/RichText'

export const ContentBlockComponent: React.FC<ContentBlock> = ({ richText }) => {
  return richText ? <RichText data={richText} /> : null
}
