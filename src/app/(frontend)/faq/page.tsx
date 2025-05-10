import { getPayload } from '@/util/getPayload'
import { FaqClientComponent } from './page.client'

const fetchData = async () => {
  const payload = await getPayload()
  const { questions } = await payload.findGlobal({
    slug: 'faq',
  })

  return { questions }
}

export default async function Faq() {
  const { questions } = await fetchData()

  return <FaqClientComponent questions={questions} />
}
