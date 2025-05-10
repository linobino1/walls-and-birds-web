import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: process.env.MEDIA_URL ? [new URL(`${process.env.MEDIA_URL}/**`)] : [],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
