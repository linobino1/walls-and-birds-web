import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Songs } from './collections/Songs'
import { Shows } from './collections/Shows'
import { Faq } from './globals/Faq'
import { Pages } from './collections/Pages'
import { defaultLexical } from './seed/util/defaultLexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Pages, Shows, Songs, Users, Media],
  globals: [Faq],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: !!process.env.S3_ENABLED,
      collections: {
        media: {
          prefix: 'media',
          // serve files from the S3 bucket
          generateFileURL: (file) => `${process.env.MEDIA_URL}/media/${file.filename}`,
        },
      },
      bucket: process.env.S3_BUCKET ?? '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY ?? '',
          secretAccessKey: process.env.S3_SECRET_KEY ?? '',
        },
        region: process.env.S3_REGION,
      },
    }),
  ],
})
