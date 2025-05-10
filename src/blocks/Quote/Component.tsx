import { Gutter } from '@/components/Gutter'
import type { QuoteBlock } from '@/payload-types'

export const QuoteBlockComponent: React.FC<QuoteBlock> = ({ content, caption }) => {
  return (
    <Gutter className="mt-4 mb-6" size="sm">
      <div className="mb-2 text-left italic">{content}</div>
      {caption && <div className="pl-4 text-left text-sm text-neutral-400">{`– ${caption}`}</div>}
    </Gutter>
  )
}
