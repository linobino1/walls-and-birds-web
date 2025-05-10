'use client'

import React, { createContext, useState } from 'react'
import { fadeTime } from './constants'

type FiretruckContextType = {
  toggle: () => void
  isPlaying: boolean
  isFading: boolean
}

export const FiretruckContext = createContext<FiretruckContextType>({
  toggle() {},
  isPlaying: false,
  isFading: false,
})

export const FiretruckProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFading, setIsFading] = useState(false)

  const toggle = () => {
    setIsPlaying((prev) => !prev)
    setIsFading(true)
    setTimeout(() => {
      setIsFading(false)
    }, fadeTime)
  }

  return (
    <FiretruckContext.Provider value={{ toggle, isPlaying, isFading }}>
      {children}
    </FiretruckContext.Provider>
  )
}
