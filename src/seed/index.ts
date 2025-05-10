import type { PayloadRequest, CollectionSlug, Payload } from 'payload'
import type { SeedContext } from './types'
import { readdirSync, rmSync, existsSync, mkdirSync } from 'fs'
import path from 'path'
import { globSync } from 'glob'
import { fileURLToPath } from 'url'
import { seedDoc } from './util/seedDoc'
import { seedGlobal } from './util/seedGlobal'
import { about } from './pages/about'
import { faq } from './globals/faq'
import shows from './shows.json'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const collections: CollectionSlug[] = ['media', 'pages', 'shows']

export const seed = async (payload: Payload, req?: PayloadRequest): Promise<void> => {
  payload.logger.info('Seeding database...')

  if (process.env.NODE_ENV === 'production') {
    payload.logger.error('Seed script is disabled in production. Aborting seed script.')
    return
  }

  payload.logger.info(`— Clearing media...`)
  const mediaDir = path.resolve(dirname, '../../media')
  if (existsSync(mediaDir)) {
    readdirSync(mediaDir).forEach((file) => rmSync(path.join(mediaDir, file), { recursive: true }))
    // create sizes directory
    mkdirSync(path.join(mediaDir, 'sizes'), { recursive: true })
  } else {
    payload.logger.error(`— Media directory not found: ${mediaDir}`)
  }

  payload.logger.info(`— Clearing collections...`)
  await Promise.all([
    ...collections.map(async (collection) =>
      payload.delete({
        collection: collection as 'media',
        where: {},
        req,
      }),
    ),
  ])

  const context: SeedContext = {
    payload,
    media: new Map(),
    pages: new Map(),
  }

  payload.logger.info(`— Seeding media...`)
  await Promise.all(
    globSync(path.resolve(dirname, 'media/*')).map(async (filePath) => {
      const slug = path.basename(filePath)
      return seedDoc({
        collection: 'media',
        generator: () => ({
          alt: '',
        }),
        slug,
        filePath: path.resolve(dirname, filePath),
        context,
      })
    }),
  )

  payload.logger.info(`— Seeding shows...`)
  await Promise.all(
    shows.map((data) =>
      payload.create({
        collection: 'shows',
        data,
      }),
    ),
  )

  payload.logger.info(`— Seeding pages...`)
  await seedDoc({
    collection: 'pages',
    generator: about,
    context,
  })

  payload.logger.info(`— Seeding globals...`)
  await seedGlobal({
    slug: 'faq',
    generator: faq,
    context,
  })
  payload.logger.info('Seeded database successfully!')
}
