import { getPayload } from '@/util/getPayload'
import Link from 'next/link'

const fetchData = async () => {
  const payload = await getPayload()
  const songs = await payload.find({
    collection: 'songs',
    sort: 'title',
    limit: 9999,
  })
  return { songs }
}

export default async function Songbook() {
  const { songs } = await fetchData()
  return (
    <ul className="space-y-1 text-xl">
      {songs.docs.map((song, i) => (
        <li key={i}>
          <Link href={`/songbook/${song.slug}`} className="hover:underline">
            {song.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
