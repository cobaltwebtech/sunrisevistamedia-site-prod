import { defineCollection, z } from "astro:content"

const clients = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
      clients: z.array(
        z.object({
          title: z.string().min(1),
          image: image(),
          url: z.string(),
          featured: z.number().min(1).optional(),
        }),
      ),
  }),
});

const pages = defineCollection({
  type: "content",
    schema: ({ image }) => z.object({
      pageData: z.array(
        z.object({
          isItemRight: z.boolean(),
          order: z.number().min(1).optional(),
          title: z.string(),
          subTitle: z.string(),
          img: image(),
          imgAlt: z.string(),
          btnExists: z.boolean(),
          btnText: z.string(),
          btnURL: z.string(),
          btnIcon: z.string(),
        }),
      ),
  }),
});

export const collections = {
  clients,
  pages,
};
