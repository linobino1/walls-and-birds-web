'use client'

import { FiretruckContext } from '@/components/Firetruck'
import { Gutter } from '@/components/Gutter'
import { cn } from '@/util/cn'
import { use } from 'react'

export default function Legal() {
  const { isPlaying } = use(FiretruckContext)

  return (
    <Gutter
      className={cn('prose pt-12', {
        'prose-invert': isPlaying,
      })}
    >
      <h1>Imprint</h1>
      <h2>According to § 5 TMG (Telemediengesetz):</h2>
      <p>
        leo hilsheimer
        <br />
        kranoldstrasse 9<br />
        1205 berlin
      </p>
      <h2>Contact:</h2>
      <p>
        Telefon: +49 176 640 888 65
        <br />
        E-Mail: webmaster@wallsandbirds.com
      </p>
      <h1>Disclaimer</h1>
      <p>
        <strong>Liability for content</strong>
      </p>
      <p>
        As a service provider, we are responsible for our own content on these pages according to
        Section 7, Paragraph 1 of the German Telemedia Act (TMG). According to §§ 8 to 10 TMG,
        however, we as a service provider are not obliged to monitor transmitted or stored
        third-party information or to investigate circumstances that indicate illegal activity.
        Obligations to remove or block the use of information according to general laws remain
        unaffected. However, liability in this regard is only possible from the point in time at
        which knowledge of a specific infringement of the law is known. As soon as we become aware
        of any violations of the law, we will remove this content immediately.
      </p>
      <p>
        <strong>Liability for links</strong>
      </p>
      <p>
        Our offer contains links to external third-party websites, the content of which we have no
        influence on. Therefore we cannot assume any liability for this external content. The
        respective provider or operator of the pages is always responsible for the content of the
        linked pages. The linked pages were checked for possible legal violations at the time of
        linking. Illegal content was not recognizable at the time of linking. However, a permanent
        control of the content of the linked pages is not reasonable without concrete evidence of an
        infringement. As soon as we become aware of legal violations, we will remove such links
        immediately.
      </p>
      <p>
        <strong>copyright</strong>
      </p>
      <p>
        The content and works on these pages created by the site operators are subject to German
        copyright law. The duplication, editing, distribution and any kind of exploitation outside
        the limits of copyright require the written consent of the respective author or creator.
        Downloads and copies of this site are only permitted for private, non-commercial use.
        Insofar as the content on this site was not created by the operator, the copyrights of third
        parties are observed. In particular contents of third parties are marked as such. Should you
        nevertheless become aware of a copyright infringement, we ask that you inform us
        accordingly. As soon as we become aware of legal violations, we will remove such content
        immediately.
      </p>
    </Gutter>
  )
}
