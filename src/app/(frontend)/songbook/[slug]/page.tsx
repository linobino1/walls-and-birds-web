import { getPayload } from '@/util/getPayload'
import { notFound } from 'next/navigation'
import { SongClientComponent } from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload()
  const songs = await payload.find({
    collection: 'songs',
    limit: 9999,
  })

  return songs.docs.map((song) => ({
    slug: song.slug,
  }))
}

const fetchData = async (slug: string) => {
  const payload = await getPayload()
  const song = (
    await payload.find({
      collection: 'songs',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })
  ).docs[0]

  if (!song) {
    notFound()
  }

  return { song }
}

export default async function SongPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { song } = await fetchData(slug)

  return <SongClientComponent song={song} />
}
