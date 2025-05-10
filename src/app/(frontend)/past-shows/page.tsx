import { getPayload } from '@/util/getPayload'
import { Shows } from '@/components/Shows'
import { Gutter } from '@/components/Gutter'
import { PageTitle } from '@/components/PageTitle'

const fetchData = async () => {
  const payload = await getPayload()

  // today, 00:00:00
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const shows = await payload.find({
    collection: 'shows',
    sort: '-date',
    pagination: false,
    where: {
      date: {
        less_than: today,
      },
    },
  })

  return { shows }
}

export default async function PastShowsPage() {
  const { shows } = await fetchData()
  return (
    <Gutter className="text-center">
      <PageTitle lines={['Walls & Birds', 'Past Shows']} className="mb-8" />

      <Shows shows={shows} liClassName="hover:underline" />
    </Gutter>
  )
}
