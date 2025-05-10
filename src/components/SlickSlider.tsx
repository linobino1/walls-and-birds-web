'use client'

import ReactSlick, { type Settings } from 'react-slick'
import React, { Ref } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export type Slider = ReactSlick

export type SliderProps = Settings & {
  ref?: Ref<ReactSlick>
}

// @ts-expect-error it works
const SliderComponent = !!ReactSlick.default
  ? // @ts-expect-error it works
    ReactSlick.default
  : ReactSlick

export const SlickSlider: React.FC<SliderProps> = ({ ref, children, ...props }) => {
  return (
    <SliderComponent ref={ref} {...props}>
      {children}
    </SliderComponent>
  )
}
