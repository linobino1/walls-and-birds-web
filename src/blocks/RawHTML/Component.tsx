import { Gutter } from '@/components/Gutter'
import type { RawHTMLBlock } from '@/payload-types'

export const RawHTMLBlockComponent: React.FC<RawHTMLBlock> = ({ html }) => {
  return (
    <Gutter>
      <div dangerouslySetInnerHTML={{ __html: html }} className="my-12 prose" />
    </Gutter>
  )
}
