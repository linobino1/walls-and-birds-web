import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .replace(/ä/i, 'ae')
    .replace(/ö/i, 'oe')
    .replace(/ü/i, 'ue')
    .replace(/ß/i, 'ss')
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
