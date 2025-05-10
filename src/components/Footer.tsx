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
  return pathname === '/faq' ? null : (
    <footer
      className={cn(
        'z-10 mt-16 flex w-full items-center gap-y-2 p-4 font-serif text-xs transition-colors max-md:flex-col-reverse md:justify-between',
        {
          'text-neutral-400': !isPlaying,
        },
        className,
      )}
      {...props}
    >
      <div className="flex gap-4">
        <div>© {new Date().getFullYear()} Walls & Birds</div>
        <Link href="/legal">legal notice</Link>
      </div>
      <div className="flex gap-4">
        <Link href="/faq">faq</Link>
        {pathname !== '/' && <Link href="/">home</Link>}
        <Link href="/songbook">songbook</Link>
        {pathname === '/' && <Link href="/past-shows">past shows</Link>}
        <FiretruckToggle />
      </div>
    </footer>
  )
}
