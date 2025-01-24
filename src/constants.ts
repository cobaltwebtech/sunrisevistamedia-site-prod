import ogImageSrc from "@/assets/social.jpg";

export const SITE = {
  title: "Sunrise Vista Media",
  tagline: "tagline here",
  description: "LONG DESCRIPTION HERE",
  description_short: "SHORT DESCRIPTION",
  url: "https://www.sunrisevistamedia.com/",
  author: "Sunrise Vista Media",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title} - META TITLE HERE`,
  description: "META DESCRIPTION HERE",
  image: ogImageSrc,
};
