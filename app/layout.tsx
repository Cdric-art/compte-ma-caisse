import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CashProvider } from "@/components/CashProvider";
import { TabBar } from "@/components/TabBar";
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
  title: "Compte ta caisse",
  description:
    "Comptez votre fond de caisse et clôturez votre caisse rapidement, puis exportez le relevé en PDF.",
  icons: { icon: "/icon-180.png", apple: "/icon-180.png" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dce0e3" },
    { media: "(prefers-color-scheme: dark)", color: "#313244" },
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
      <body className="flex min-h-full flex-col bg-base text-text">
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
