import vercel from "@astrojs/vercel";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://www.sunrisevistamedia.com",
  prefetch: true,
  build: {
    assets: 'assets'
  },
  integrations: [
    tailwind(), 
    icon()
  ],
  adapter: vercel({
    imageService: true,
  }),
});
