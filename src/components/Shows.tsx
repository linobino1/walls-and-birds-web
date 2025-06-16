import type { Show } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/util/cn'

export interface Props extends React.HTMLAttributes<HTMLUListElement> {
  shows: PaginatedDocs<Show>
  liClassName?: string
}

export const Shows: React.FC<Props> = ({ shows, liClassName, className, ...props }) => (
  <ul {...props} className={cn('flex flex-col gap-2', className)}>
    {shows.totalDocs > 0 ? (
      shows.docs.map((show, i) => <LI key={i} show={show} className={liClassName} />)
    ) : (
      <li className="opacity-50">no upcoming shows</li>
    )}
  </ul>
)

const LI: React.FC<{ show: Show; className?: string }> = ({ show, className }) => {
  const label = `${format(new Date(show.date), 'PPP', {
    locale: enUS,
  })} | ${show.location}`
  return (
    <li className={className}>
      {show.link ? (
        <Link href={show.link} target="_blank" rel="noopener noreferrer">
          {label}
        </Link>
      ) : (
        <span>{label}</span>
      )}
    </li>
  )
}
