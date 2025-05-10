'use client'

import type React from 'react'
import { use } from 'react'
import { FiretruckContext } from './context'
import { cn } from '@/util/cn'

type Props = React.ComponentProps<'button'>

export const FiretruckToggle = ({ className, ...props }: Props) => {
  const context = use(FiretruckContext)

  if (!context) {
    throw new Error('FiretruckToggle must be used within a FiretruckProvider')
  }

  const { toggle, isPlaying } = context

  return (
    <button onClick={toggle} className={cn('cursor-pointer', className)} {...props}>
      {isPlaying ? 'firetruck off' : 'firetruck on'}
    </button>
  )
}
