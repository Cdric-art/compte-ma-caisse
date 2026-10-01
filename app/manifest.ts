import type { MetadataRoute } from "next";
import { siteDescription, siteName } from "@/lib/site";

/** Permet l'installation sur l'écran d'accueil, sans barre d'adresse. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Caisse",
    description: siteDescription,
    lang: "fr",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    // Fond Rosé Pine sombre, pour que l'écran de lancement ne flashe pas en blanc.
    background_color: "#191724",
    theme_color: "#191724",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
