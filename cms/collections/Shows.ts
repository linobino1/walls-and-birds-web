import type { CollectionConfig } from "payload/types";

const Shows: CollectionConfig = {
  slug: "shows",
  admin: {
    defaultColumns: ["date", "location"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "date",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "link",
      type: "text",
      required: false,
    },
  ],
};

export default Shows;
