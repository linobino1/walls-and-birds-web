import type { CollectionSlug, DataFromCollectionSlug } from 'payload'
import type { DocGenerator, SeedContext } from '../types'

/**
 * Create a new doc in the database with translated data.
 * If the doc is a page or media, it will be stored in the context by its slug (which can be overridden).
 */
export const seedDoc = async <T extends CollectionSlug>({
  collection,
  generator,
  slug,
  filePath,
  context,
}: {
  collection: T
  generator: DocGenerator<T>
  slug?: string // is used to identify the doc from a context map, default: data.slug
  filePath?: string
  context: SeedContext
}): Promise<DataFromCollectionSlug<T> | null> => {
  const { payload } = context

  const data = generator({ context })
  slug ??=
    'title' in data
      ? (data.title as string)
      : 'name' in data
        ? (data.name as string)
        : 'slug' in data
          ? (data.slug as string)
          : `${data.id}`
  payload.logger.info(`— Seeding ${collection} doc: ${slug}`)

  let doc: DataFromCollectionSlug<T> | null = null
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    doc = await payload.create<T, any>({
      collection,
      data,
      filePath,
    })
  } catch (e) {
    payload.logger.error(e)
    payload.logger.error(`— ERROR. Failed to seed ${collection} doc: ${slug}`)
    return null
  }

  // add doc to context if a map exists for the collection
  if (collection in context) {
    // @ts-expect-error context[collection] is a Map
    context[collection].set(slug, doc)
    payload.logger.info(`  added ${slug}`)
  }

  return doc
}
