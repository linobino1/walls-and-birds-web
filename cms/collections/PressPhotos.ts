import type { CollectionConfig } from "payload/types";
import path from "path";

const PressPhotos: CollectionConfig = {
  slug: "pressPhotos",
  access: {
    read: () => true,
  },
  admin: {
    group: "info",
  },
  upload: {
    staticDir: `${
      process.env.MEDIA_DIR ?? path.resolve(__dirname, "../../media")
    }/pressPhotos`,
    formatOptions: {
      format: "jpeg",
      options: {
        quality: 100,
      },
    },
    imageSizes: [
      {
        name: "_480p",
        width: 480,
        height: undefined,
      },
      {
        name: "_640p",
        width: 640,
        height: undefined,
      },
      {
        name: "_960p",
        width: 960,
        height: undefined,
      },
      {
        name: "_1280p",
        width: 1280,
        height: undefined,
      },
      {
        name: "_1920p",
        width: 1920,
        height: undefined,
      },
      {
        name: "_2560p",
        width: 2560,
        height: undefined,
      },
    ],
  },
  fields: [
    {
      name: "caption",
      type: "text",
    },
    {
      name: "rights",
      type: "text",
    },
  ],
};

export default PressPhotos;
