import type {
  DataFromGlobalSlug,
  GlobalSlug,
  CollectionSlug,
  RequiredDataFromCollection,
  Payload,
} from 'payload'
import type { Media, Page } from '@app/types/payload'

export type MediaMap = Map<string, Media>

export type PagesMap = Map<string, RequiredDataFromCollection<Page>>

export type SeedContext = {
  payload: Payload
  media: MediaMap
  pages: PagesMap
}

export type DocGenerator<T extends CollectionSlug> = (args: {
  context: SeedContext
}) => RequiredDataFromCollectionSlug<T>

export type RequiredDataFromGlobalSlug<T> = Omit<
  DataFromGlobalSlug<T>,
  'id' | 'createdAt' | 'updatedAt'
>

export type GlobalGenerator<T extends GlobalSlug> = (args: {
  context: SeedContext
}) => RequiredDataFromGlobalSlug<T>
