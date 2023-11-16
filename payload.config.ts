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
    connectOptions: {
      dbName: process.env.MONGO_DBNAME,
    },
  }),
  collections: [Users, PressPhotos, Shows, Songs],
  globals: [Faq, Info],
  typescript: {
    outputFile: path.resolve(__dirname, "cms/payload-types.ts"),
  },
});
