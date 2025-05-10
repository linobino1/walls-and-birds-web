'use client'

import type { Faq } from '@/payload-types'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/util/cn'
import { shuffleArray } from './util/shuffleArray'

type Props = {
  questions: Faq['questions']
}

const Question: React.FC<{ question: string; isActive: boolean }> = ({ question, isActive }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  // initialize random position
  useEffect(() => {
    setPosition({
      x: Math.random() * 100,
      y: Math.random() * 100,
    })
  }, [])

  return (
    <div
      className={cn(
        'absolute w-[90vw] text-center whitespace-pre-wrap transition-transform duration-500',
        {
          'text-[3px]': !isActive,
        },
      )}
      style={{
        transform: isActive
          ? 'translate(50vw,50vh) scaleX(1)'
          : `translate(${position.x}vw, ${position.y}vh) scaleX(0.1)`,
      }}
    >
      <div
        className={cn('inline transition-colors duration-500', {
          'bg-transparent': !isActive,
          'bg-black': isActive,
        })}
      >
        {question}
      </div>
    </div>
  )
}

export const FaqClientComponent = ({ questions: _questions }: Props) => {
  const [questions, setQuestions] = useState<Faq['questions']>(_questions)
  const main = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const [invert, setInvert] = useState(false)

  // shuffle questions
  useEffect(() => {
    const shuffledQuestions = [..._questions]
    shuffleArray(shuffledQuestions)
    setQuestions(shuffledQuestions)
  }, [_questions])

  // i toggles invert, space goes to the next question
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'i') {
      console.log('invert')
      setInvert(!invert)
    } else if (e.key === ' ') {
      nextQuestion()
    }
  }

  const nextQuestion = async () => {
    setActive((prev) => (prev === null ? 0 : (prev + 1) % questions.length))
  }

  // focus the main element when the page loads in order to enable keyboard
  useEffect(() => {
    main.current?.focus()
  })

  return (
    <main
      onClick={nextQuestion}
      tabIndex={0}
      ref={main}
      onKeyDown={onKeyDown}
      className={cn(
        'fixed inset-0 z-10 flex items-center justify-center overflow-hidden text-2xl',
        {
          'bg-black text-white': !invert,
          'bg-white text-black': invert,
        },
      )}
    >
      <div className="h-full w-full translate-x-[-44%]">
        {questions?.map(({ question }, index) => (
          <Question key={index} question={question ?? ''} isActive={active === index} />
        ))}
      </div>
    </main>
  )
}
