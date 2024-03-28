import type { CollectionConfig } from "payload/types";

const PressPhotos: CollectionConfig = {
  slug: "pressPhotos",
  access: {
    read: () => true,
  },
  admin: {
    group: "info",
  },
  upload: {
    staticURL: "/uploads/press-photos",
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
