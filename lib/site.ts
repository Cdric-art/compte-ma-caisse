import type { Metadata } from "next";

/**
 * URL canonique du site. Vercel expose l'URL de production au build ; en
 * local on retombe sur le serveur de developpement. NEXT_PUBLIC_SITE_URL
 * prend le dessus le jour ou un nom de domaine arrive.
 */
export const siteUrl = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
})();

export const siteName = "Compte ta caisse";

export const siteDescription =
  "Comptez votre fond de caisse et clôturez votre caisse en quelques minutes, puis exportez le relevé en PDF.";

/** L'aperçu de partage, servi par app/opengraph-image.png. */
const ogImage = "/opengraph-image.png";

/**
 * Métadonnées d'une route. Next fusionne les métadonnées de façon
 * superficielle : un `openGraph` déclaré dans un segment enfant remplace
 * entièrement celui du parent, image comprise. Tout redéclarer ici évite
 * qu'une page perde silencieusement son aperçu de partage.
 */
export function routeMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = path === "/" ? siteName : `${title} · ${siteName}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName,
      title: fullTitle,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
