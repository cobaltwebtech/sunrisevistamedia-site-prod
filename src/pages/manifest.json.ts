export const prerender = true

import type { APIRoute, ImageMetadata } from "astro"
import icon from "@/assets/favicon/icon.png"
import maskableIcon from "@/assets/favicon/icon-maskable.png"

interface Favicon {
  purpose: "any" | "maskable" | "monochrome"
  src: ImageMetadata
  sizes: number[]
}

const sizes = [192, 512]
const favicons: Favicon[] = [
  {
    purpose: "any",
    src: icon,
    sizes,
  },
  {
    purpose: "maskable",
    src: maskableIcon,
    sizes,
  },
]

export const GET: APIRoute = async () => {
  const icons = favicons.flatMap((favicon) =>
    sizes.map((size) => ({
      src: `/icons/${favicon.purpose}-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: favicon.purpose,
    })),
  )

  const manifest = {
    short_name: "SVM",
    name: "Sunrise Vista Media",
    icons,
    display: "minimal-ui",
    id: "/",
    start_url: "/",
    theme_color: "#ff4e9e",
    background_color: "#0f172a",
  }

  return new Response(JSON.stringify(manifest))
}
