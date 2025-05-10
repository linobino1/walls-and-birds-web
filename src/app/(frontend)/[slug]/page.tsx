import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Gutter } from '@/components/Gutter'
import { PageTitle } from '@/components/PageTitle'
import { getPayload } from '@/util/getPayload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const payload = await getPayload()
  return (
    await payload.find({
      collection: 'pages',
      where: { _status: { equals: 'published' } },
      limit: 9999,
      select: {
        slug: true,
      },
    })
  ).docs.map((page) => ({
    slug: page.slug,
  }))
}

const fetchData = async (slug: string) => {
  const payload = await getPayload()
  const draft = (await draftMode()).isEnabled

  const page = (
    await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      draft,
    })
  ).docs[0]

  if (!page) {
    notFound()
  }

  return page
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { blocks, hero } = await fetchData(slug)

  return (
    <div className="text-center">
      {hero === 'heading' && (
        <Gutter>
          <PageTitle lines={['Walls & Birds']} link={{ href: '/' }} />
        </Gutter>
      )}
      <RenderBlocks blocks={blocks} />
    </div>
  )
}
