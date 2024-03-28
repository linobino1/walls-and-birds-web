import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { viteBundler } from "@payloadcms/bundler-vite";
import { buildConfig } from "payload/config";
import path from "path";
import Users from "./cms/collections/Users";
import PressPhotos from "./cms/collections/PressPhotos";
import Shows from "./cms/collections/Shows";
import Songs from "./cms/collections/Songs";
import Faq from "./cms/globals/Faq";
import Info from "./cms/globals/Info";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
  admin: {
    user: Users.slug,
    bundler: viteBundler(),
    vite: (incomingViteConfig) => ({
      ...incomingViteConfig,
      build: {
        ...incomingViteConfig.build,
        emptyOutDir: false,
      },
    }),
  },
  editor: lexicalEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGO_URL ?? false,
  }),
  collections: [Users, PressPhotos, Shows, Songs],
  globals: [Faq, Info],
  typescript: {
    outputFile: path.resolve(__dirname, "cms/payload-types.ts"),
  },
  plugins: [
    cloudStorage({
      enabled: process.env.S3_ENABLED === "true",
      collections: {
        pressPhotos: {
          prefix: "press-photos/",
          adapter: s3Adapter({
            bucket: process.env.S3_BUCKET || "",
            config: {
              endpoint: process.env.S3_ENDPOINT || undefined,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY || "",
                secretAccessKey: process.env.S3_SECRET_KEY || "",
              },
              region: process.env.S3_REGION || "",
            },
          }),
        },
      },
    }),
  ],
});
