/**
 * this generates a relative URL to the preview API route, which will activate draft mode and then redirect to the given path
 */
export const generatePreviewPath = (path: string) => {
  const encodedParams = new URLSearchParams({
    path,
  })

  return `/api/preview?${encodedParams.toString()}`
}
