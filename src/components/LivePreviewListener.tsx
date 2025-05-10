'use client'

import { serverUrl } from '@/util/serverUrl'
import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation.js'
import React from 'react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()

  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverUrl} />
}
