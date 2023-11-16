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
    },
  ],
};

export default Faq;
