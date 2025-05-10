'use client'

import type { Song as SongType } from '@/payload-types'
import { useRef, useState } from 'react'
import { transposeChord, transposeMap } from './util'

type Props = {
  song: SongType
}

export const SongClientComponent = ({ song }: Props) => {
  const content = useRef<HTMLDivElement>(null)

  // Transpose logic
  const [key, setKey] = useState(song?.key || 'C ')
  const transpose = (steps: number) => {
    // HACK: "A" is not valid chord, but "A " is
    // reason: we need to parse the song content to find chords, and we don't want to replace all "A" letters in the song
    setKey(transposeChord(`${key.trim()} `, steps))

    if (content.current?.innerHTML) {
      content.current.innerHTML = content.current.innerHTML.replace(
        new RegExp(Object.keys(transposeMap).join('|'), 'g'),
        (matched) => transposeMap[matched] as string,
      )
    }
  }

  return (
    <div className="flex justify-center overflow-hidden text-left font-mono text-base tracking-[-1px]">
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-bold">
          {song.by} - {song.title}
        </h2>
        <p className="my-2">
          tom:{' '}
          <button onClick={() => transpose(-1)} className="cursor-pointer">
            -
          </button>{' '}
          {key.trim()}{' '}
          <button onClick={() => transpose(1)} className="cursor-pointer">
            +
          </button>
        </p>

        <br />

        <div ref={content} className="leading-[1.3] whitespace-pre">
          {song.content}
        </div>
      </div>
    </div>
  )
}
