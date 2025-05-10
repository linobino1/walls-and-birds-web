import type { ArticleBlock, Media } from '@/payload-types'
import { Gutter } from '@/components/Gutter'
import Link from 'next/link'

export const ArticleBlockComponent: React.FC<ArticleBlock> = ({ title, caption, media }) => {
  if (!(media as Media).url) {
    throw new Error('Media doc is missing depth.')
  }
  return (
    <Gutter className="mt-4 mb-6" size="sm">
      <Link href={(media as Media).url as string} target="_blank">
        <div className="text-left">{title}</div>
      </Link>
      {caption && <div className="text-left text-sm text-neutral-400">{caption}</div>}
    </Gutter>
  )
}
