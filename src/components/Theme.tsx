'use client'

import type React from 'react'
import { cn } from '@/util/cn'
import { usePathname } from 'next/navigation'
import { fadeTime, FiretruckContext, FiretruckVideo } from './Firetruck'
import { use } from 'react'

type Props = React.HTMLAttributes<HTMLDivElement>

export const Theme = ({ children, className, style, ...props }: Props) => {
  const pathname = usePathname()

  const isBlack = !pathname.match('songbook|legal')

  const { isPlaying, isFading } = use(FiretruckContext)

  return (
    <div
      className={cn(
        {
          // transition background when play state changes
          'transition-colors ease-in-out': isFading,
          // isBlack: white text, black background only when not playing
          'text-white': isBlack,
          'bg-black': isBlack && !isPlaying,
          // !isBlack: only when not playing: white text, white background
          'bg-white text-black': !isBlack && !isPlaying,
        },
        className,
      )}
      style={{
        transitionDuration: `${fadeTime}ms`,
        ...style,
      }}
      {...props}
    >
      <FiretruckVideo />
      {children}
    </div>
  )
}
