import type { DocGenerator } from '../types'
import { RequiredDataFromCollectionSlug } from 'payload'
import pressReviews from '../pressReviews.json'
import pressReviewsUnkown from '../pressReviewsUnknown.json'

const galleryCaptions = [
  'this is an image with a caption...',
  "this too... but the next one doesn't have one",
  undefined,
]

const articles = [
  {
    title: 'Goodbye Solitude',
    caption: 'Ljunkvist E. (2016)',
    mediaSlug: 'dummy.pdf',
  },
  {
    title: 'Inner View to Walls & Birds',
    caption: 'Veinwright, L. (2020)',
    mediaSlug: 'dummy.pdf',
  },
  {
    title: 'Interview with Walls & Birds',
    caption: 'Chop Magazine (2017)',
    mediaSlug: 'dummy.pdf',
  },
]

export const about: DocGenerator<'pages'> = ({ context: { media } }) =>
  ({
    title: 'About',
    slug: 'about',
    slugLock: false,
    blocks: [
      {
        blockType: 'content',

        richText: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'About',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'heading',
                version: 1,
                tag: 'h1',
              },

              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Walls & Birds first gained critical acclaim with their self-released tapes “Daytona Beach” (2015) and “Fitness Lady Wellness” (2017) in the mid-2010s. Their live shows take audiences beyond the ordinary concert experience. Their musical talents, combined with witty humor, modesty and joy, as well as each members ability to be the crowds favourite, guarantee a serene, heartwarming show for all ages and a genuine experience for all music lovers. ',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
                textFormat: 0,
                textStyle: '',
              },

              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Walls & Birds is available for bookings worldwide. Please contact ',
                    type: 'text',
                    version: 1,
                  },

                  {
                    type: 'autolink',

                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'judy@wallsandbirds.com',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',

                    fields: {
                      linkType: 'custom',
                      url: 'mailto:judy@wallsandbirds.com',
                    },
                    format: '',
                    indent: 0,
                    version: 2,
                  },

                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: '.  Book now for your festival, garden party, wedding, funeral, or anniversary.',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
                textFormat: 0,
                textStyle: '',
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Gallery',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'heading',
                version: 1,
                tag: 'h2',
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        id: '681f198cbd7328d3fe619044',
      },
      {
        blockType: 'gallery',
        images: galleryCaptions.map((caption) => ({
          media: media.get('img.jpg').id,
          caption,
        })),
      },
      {
        blockType: 'content',

        richText: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Press Reviews',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'heading',
                version: 1,
                tag: 'h2',
              },

              ...pressReviews.map(({ content, caption }) => ({
                type: 'block',
                version: 2,
                format: '',

                fields: {
                  content,
                  caption,
                  blockName: '',
                  blockType: 'quote',
                },
              })),

              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Collected Music Reviews',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'heading',
                version: 1,
                tag: 'h2',
              },

              ...pressReviewsUnkown.map(({ content }) => ({
                type: 'block',
                version: 2,
                format: '',

                fields: {
                  content,
                  blockName: '',
                  blockType: 'quote',
                },
              })),

              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Further Reading',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'heading',
                version: 1,
                tag: 'h2',
              },

              ...articles.map(({ title, caption, mediaSlug }) => ({
                type: 'block',
                version: 2,
                format: '',

                fields: {
                  title,
                  caption,
                  media: media.get(mediaSlug).id,
                  blockName: '',
                  blockType: 'article',
                },
              })),
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        id: '681f293a126dbfed7033cee0',
      },
    ],
  }) satisfies RequiredDataFromCollectionSlug<'pages'>
