'use client'

import type React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/util/cn'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

export const Footer = ({ className, ...props }: Props) => {
  const pathname = usePathname()
  return (
    <footer
      className={cn(
        'z-10 mt-16 flex w-full justify-center gap-4 p-4 font-serif text-xs text-neutral-400 md:justify-end',
        className,
      )}
      {...props}
    >
      <div>© {new Date().getFullYear()} Walls & Birds</div>
      <Link href="/legal">legal notice</Link>
      {pathname === '/' ? <Link href="/past-shows">past shows</Link> : <Link href="/">home</Link>}
    </footer>
  )
}
