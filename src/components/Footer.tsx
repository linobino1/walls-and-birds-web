'use client'

import type React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/util/cn'
import { FiretruckContext, FiretruckToggle } from './Firetruck'
import { use } from 'react'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

export const Footer = ({ className, ...props }: Props) => {
  const pathname = usePathname()
  const { isPlaying } = use(FiretruckContext)
  return (
    <footer
      className={cn(
        'z-10 mt-16 flex w-full justify-center gap-4 p-4 font-serif text-xs transition-colors md:justify-end',
        {
          'text-neutral-400': !isPlaying,
        },
        className,
      )}
      {...props}
    >
      <div>© {new Date().getFullYear()} Walls & Birds</div>
      <Link href="/legal">legal notice</Link>
      <FiretruckToggle />
      {pathname === '/' ? <Link href="/past-shows">past shows</Link> : <Link href="/">home</Link>}
    </footer>
  )
}
