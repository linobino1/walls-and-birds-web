'use client'

import type { GalleryBlock } from '@/payload-types'
import { Gutter } from '@/components/Gutter'
import { SlickSlider, type Slider } from '@/components/SlickSlider'
import { Image } from '@/components/Image'
import { useRef, useState } from 'react'
import { cn } from '@/util/cn'

export const GalleryBlockComponent: React.FC<GalleryBlock> = ({ images }) => {
  const sliderRef = useRef<Slider>(null)

  const [activeIndex, setActiveIndex] = useState(0)

  const Arrow: React.FC<{
    type: 'next' | 'prev'
  }> = ({ type }) => {
    return (
      <div
        onClick={() =>
          type === 'next' ? sliderRef.current?.slickNext() : sliderRef.current?.slickPrev()
        }
        className={cn('pointer-events-auto cursor-pointer')}
      >
        <div className="hidden">
          Icon from Material Symbols by Google -
          https://github.com/google/material-design-icons/blob/master/LICENSE
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className={cn('hover:text-pink text-neutral-100 shadow', {
            'rotate-180 transform': type === 'next',
          })}
        >
          <path
            fill="currentColor"
            d="m3.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675T.825 12t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"
          />
        </svg>
      </div>
    )
  }

  return (
    <Gutter className="mt-8 mb-4" size="sm">
      <div className="relative -mx-4">
        <SlickSlider
          ref={sliderRef}
          dots={false}
          arrows={false}
          beforeChange={(_, index: number) => setActiveIndex(index)}
        >
          {images?.map(({ media }, index) => (
            <div key={index} className="flex flex-col items-center px-4">
              <Image
                src={media}
                className="aspect-[3/2] rounded-sm bg-transparent object-contain object-center"
                sizes="(max-width: 748px) 100vw, 728px"
              />
            </div>
          ))}
        </SlickSlider>
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between p-6">
          <Arrow type="prev" />
          <Arrow type="next" />
        </div>
      </div>
      <p className="min-h-8 text-center text-sm text-neutral-400">
        {images?.[activeIndex]?.caption}
      </p>
    </Gutter>
  )
}
