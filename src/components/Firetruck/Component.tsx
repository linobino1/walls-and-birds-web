'use client'

import { use, useEffect, useRef } from 'react'
import { FiretruckContext } from './context'
import { cn } from '@/util/cn'
import { fadeTime } from './constants'

export const FiretruckVideo = () => {
  const { isPlaying } = use(FiretruckContext)

  // this timeout will be used to delay the video pause
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play()
      audioRef.current?.play()

      // if there is a timeout running to pause the video, clear it
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    } else {
      audioRef.current?.pause()

      // let's play the video for a bit before really pausing it
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        videoRef.current?.pause()
      }, fadeTime)
    }
  }, [isPlaying])

  return (
    <div
      className={cn('fixed inset-0 -z-10 opacity-100 transition-opacity duration-500', {
        'opacity-0': !isPlaying,
      })}
    >
      <video
        ref={videoRef}
        poster="/firetruck/still.jpg"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/firetruck/firetruck.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <audio ref={audioRef} autoPlay loop>
        <source src="/firetruck/komm_here_in_time.mp3" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  )
}
