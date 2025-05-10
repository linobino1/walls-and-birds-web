export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>

export const isPreview = async (searchParams?: SearchParams): Promise<boolean> => {
  const params = await searchParams
  return !!params?.preview
}
