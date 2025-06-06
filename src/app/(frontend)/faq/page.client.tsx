'use client'

import type { Faq } from '@/payload-types'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/util/cn'
import { shuffleArray } from './util/shuffleArray'
import { useRouter } from 'next/navigation'

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
        'absolute w-[90vw] origin-center text-center text-balance whitespace-pre-wrap transition-transform duration-500',
        {
          'text-[3px]': !isActive,
        },
      )}
      style={{
        transform: isActive
          ? 'translate(50vw, calc(50vh - 50%)) scaleX(1)'
          : `translate(${position.x}vw, ${position.y}vh) scaleX(0.1)`,
      }}
    >
      <div
        className={cn('inline py-2 transition-colors duration-500', {
          'bg-transparent': !isActive,
          'bg-black': isActive,
        })}
      >
        {question.trim()}
      </div>
    </div>
  )
}

export const FaqClientComponent = ({ questions: _questions }: Props) => {
  const [questions, setQuestions] = useState<Faq['questions']>(_questions)
  const main = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const router = useRouter()

  // shuffle questions
  useEffect(() => {
    const shuffledQuestions = [..._questions]
    shuffleArray(shuffledQuestions)
    setQuestions(shuffledQuestions)
  }, [_questions])

  // i toggles invert, space goes to the next question
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      nextQuestion()
    } else if (e.key === 'Escape') {
      router.push('/')
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
        'fixed inset-0 z-50 flex items-center justify-center overflow-hidden text-lg md:text-2xl',
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
