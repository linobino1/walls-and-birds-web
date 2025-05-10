import NextImage, { ImageProps } from 'next/image'
import React from 'react'
import { cn } from '@/util/cn'
import { Media } from '@/payload-types'

type Props = Omit<ImageProps, 'src' | 'alt'> & { src: Media | string; alt?: string }

export const Image: React.FC<Props> = ({ src, alt = '', width, height, className, ...props }) => {
  if (typeof src === 'object') {
    width ||= src.width || undefined
    height ||= src.height || undefined
    src = src.url as string
  }

  return (
    <NextImage
      {...props}
      className={cn('rounded-xs bg-neutral-50/50', className)}
      alt={alt}
      src={src}
      width={width}
      height={height}
    />
  )
}
