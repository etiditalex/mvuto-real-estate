import type { MetadataRoute } from "next";
import { COMPANY_NAME, COMPANY_TAGLINE, LOGO_URL } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY_NAME,
    short_name: "MVUTO",
    description: COMPANY_TAGLINE,
    start_url: "/",
    display: "standalone",
    background_color: "#001447",
    theme_color: "#001447",
    lang: "en-KE",
    icons: [
      {
        src: LOGO_URL,
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
