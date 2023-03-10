import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Shows from './collections/Shows';
import Songs from './collections/Songs';
import Faq from './globals/Faq';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors: [
    process.env.PAYLOAD_PUBLIC_CORS || 'http://localhost:5173',
  ],
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Shows,
    Songs,
  ],
  globals: [
    Faq,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
