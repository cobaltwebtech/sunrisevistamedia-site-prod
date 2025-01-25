import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import sitemap from "@inox-tools/sitemap-ext";

// https://astro.build/config
export default defineConfig({
  site: "https://www.sunrisevistamedia.com",
  prefetch: true,
  output: 'server',
  integrations: [
    tailwind(), 
    icon(),
    sitemap({
      includeByDefault: true,
    }),
  ],
  adapter: vercel({
    imageService: true,
  }),
});
