import type { GlobalConfig } from "payload/types";

const Faq: GlobalConfig = {
  slug: "faq",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "questions",
      type: "array",
      fields: [
        {
          name: "question",
          type: "text",
        },
      ],
      required: true,
    },
  ],
};

export default Faq;
