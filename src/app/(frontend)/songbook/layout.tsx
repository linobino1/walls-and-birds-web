import { Gutter } from '@/components/Gutter'
import { PageTitle } from '@/components/PageTitle'

export default async function SongbookLayout({ children }: { children: React.ReactNode }) {
  return (
    <Gutter className="text-center">
      <PageTitle lines={['The', 'Walls & Birds', 'Songbook']} link={{ href: '/songbook' }} />
      {children}
    </Gutter>
  )
}
