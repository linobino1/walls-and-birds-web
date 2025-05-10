'use client'

import { use } from 'react'
import { FiretruckContext } from './context'
import { cn } from '@/util/cn'
import { fadeTime } from './constants'

type Props = React.ComponentProps<'div'>

export const Scaler = ({ className, style, ...props }: Props) => {
  const context = use(FiretruckContext)

  if (!context) {
    throw new Error('Scaler must be used within a FiretruckProvider')
  }

  const { isPlaying } = context

  return (
    <div
      className={cn(
        'scale-100 transition-transform ease-in-out',
        {
          'scale-50': isPlaying,
        },
        className,
      )}
      style={{
        transitionDuration: `${fadeTime}ms`,
        ...style,
      }}
      {...props}
    />
  )
}
