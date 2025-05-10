'use client'

import { cn } from '@/util/cn'
import { usePathname } from 'next/navigation'
import type React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement>

export const Theme = ({ children, className, ...props }: Props) => {
  const pathname = usePathname()

  const isBlack = !pathname.match('songbook|legal')
  return (
    <div
      className={cn(
        {
          'bg-white text-black': !isBlack,
          'bg-black text-white': isBlack,
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
