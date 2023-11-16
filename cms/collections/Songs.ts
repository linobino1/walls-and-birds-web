import slug from "../fields/slug";
import type { CollectionConfig } from "payload/types";

const Songs: CollectionConfig = {
  slug: "songs",
  admin: {
    defaultColumns: ["title"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      unique: true,
    },
    slug,
    {
      name: "key",
      type: "text",
      required: true,
    },
    {
      name: "by",
      type: "text",
      required: true,
      defaultValue: "Walls & Birds",
    },
    {
      name: "content",
      type: "textarea",
      required: true,
    },
  ],
};

export default Songs;
