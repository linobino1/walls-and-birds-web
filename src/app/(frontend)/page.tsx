import React from 'react'
import { Shows } from '@/components/Shows'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { getPayload } from '@/util/getPayload'
import { SocialIcons } from '@/components/SocialIcons'
import Link from 'next/link'
import { Scaler } from '@/components/Firetruck/Scaler'

const fetchData = async () => {
  const payload = await getPayload()
  const shows = await payload.find({
    collection: 'shows',
    sort: 'date',
    where: {
      date: {
        greater_than_equal: new Date(),
      },
    },
  })
  return { shows }
}

const Spacer = () => <hr className="my-6 min-h-[0.1px] md:my-8" />

export default async function HomePage() {
  const { shows } = await fetchData()

  return (
    <Scaler className="pink-links flex flex-1 flex-col items-center justify-center gap-[3px] text-center text-xl leading-tight md:gap-4 md:text-2xl">
      <h1 className="font-cooper mt-[5rem] mb-[3rem] cursor-none text-4xl md:text-8xl">
        Walls & Birds
      </h1>

      <h2 className="mb-[0.4em] text-2xl md:text-3xl">tour dates</h2>

      <Shows shows={shows} />

      <Spacer />

      <h2 className="text-2xl md:text-3xl">email newsletter</h2>
      <NewsletterSignup />

      <Spacer />

      <h2 className="text-2xl md:text-3xl">
        <a href="https://wallsandbirds.bandcamp.com" target="_blank" rel="noopener noreferrer">
          shop <span className="align-bottom text-[120%]">↗</span>
        </a>
      </h2>

      <Spacer />

      <SocialIcons />

      <Spacer />

      <nav className="flex flex-col gap-[8px] leading-tight">
        <a href="mailto:judy@wallsandbirds.com">contact</a>
        <Link href="/faq">faq</Link>
        <Link href="/songbook">songbook</Link>
      </nav>
    </Scaler>
  )
}
