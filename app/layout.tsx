import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CashProvider } from "@/components/CashProvider";
import { TabBar } from "@/components/TabBar";
import { routeMetadata, siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Resout les URL relatives des metadonnees (Open Graph, canoniques).
  metadataBase: new URL(siteUrl),
  ...routeMetadata({
    title: siteName,
    description: siteDescription,
    path: "/",
  }),
  // Après le spread : le gabarit suffixe le titre des pages enfants,
  // là où routeMetadata ne pose qu'un titre simple.
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  applicationName: siteName,
  // Permet l'ajout a l'ecran d'accueil iOS sans la barre d'adresse Safari.
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "default",
  },
  // Les icônes viennent des fichiers app/favicon.ico, app/icon.svg et
  // app/apple-icon.png : les déclarer ici les remplacerait.
};

/** Teinte la barre du navigateur, aux couleurs de fond Rosé Pine. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf4ed" },
    { media: "(prefers-color-scheme: dark)", color: "#191724" },
  ],
};

/** Applique le thème avant le premier rendu pour éviter le flash de couleur. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-base text-text">
        <CashProvider>
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4">
            {children}
          </div>
          <TabBar />
        </CashProvider>
      </body>
    </html>
  );
}
