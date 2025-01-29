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
    icon({
      include: {
        'fa-brands': [
          'facebook',
          'vimeo',
          'instagram'
        ],
        fluent: [
          'people-chat-24-filled'
        ],
        'fluent-color': [
          'camera-24',
          'error-circle-24',
          'video-24'
        ],
        mdi: [
          'arrow-up-drop-circle',
          'envelope', 
          'send', 
          'connect-without-contact',
          'information-slab-circle',
          'film-open-check',
          'movie-edit',
          'bullhorn',
          'youtube-tv',
          'arrow-right',
          'home',
          'email-check'
        ],
        mingcute: [
          'video-camera-fill',
          'menu-fill',
          'close-fill',
          'sun-fill',
          'moon-stars-fill',
          'arrow-right-fill'
        ]
      }
    }),
    sitemap({
      includeByDefault: true,
    }),
  ],
  adapter: vercel({
    imageService: true,
  }),
});
