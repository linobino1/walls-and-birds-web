import type { GlobalConfig } from "payload/types";

const Info: GlobalConfig = {
  slug: "info",
  access: {
    read: () => true,
  },
  admin: {
    group: "info",
  },
  fields: [
    {
      name: "photos",
      type: "array",
      label: "Photos",
      fields: [
        {
          name: "photo",
          type: "upload",
          relationTo: "pressPhotos",
          required: true,
        },
      ],
    },
  ],
};

export default Info;
