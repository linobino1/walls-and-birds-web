import React from 'react'
import './global.css'
import { Footer } from '@/components/Footer'
import { Theme } from '@/components/Theme'

export const metadata = {
  title: 'Walls & Birds',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black text-white">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="font-sans">
        <Theme>
          <main className="flex min-h-screen flex-col">{children}</main>
          <Footer />
        </Theme>
      </body>
    </html>
  )
}
