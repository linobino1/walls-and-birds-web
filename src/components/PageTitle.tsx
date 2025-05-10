import { cn } from '@/util/cn'
import type { LinkProps } from 'next/link'
import Link from 'next/link'

type Props = React.ComponentProps<'h1'> & {
  lines: string[]
  link?: LinkProps
}

export const PageTitle = ({ link, lines, className, ...props }: Props) => {
  const inner = (
    <h1 className={cn('font-cooper mt-16 mb-12 text-4xl', className)} {...props}>
      {lines.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </h1>
  )

  return link ? (
    <Link {...link} className="contents">
      {inner}
    </Link>
  ) : (
    inner
  )
}
