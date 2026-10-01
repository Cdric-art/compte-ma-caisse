import { routeMetadata } from "@/lib/site";

/**
 * La page est un Client Component : elle ne peut pas exporter `metadata`.
 * Ce layout, rendu sur le serveur, porte donc les métadonnées de la route.
 */
export const metadata = routeMetadata({
  title: "Caisse",
  description:
    "Saisissez vos rapports de caisse et vos moyens de paiement, puis exportez le relevé du service en PDF.",
  path: "/caisse",
});

export default function CaisseLayout({ children }: LayoutProps<"/caisse">) {
  return children;
}
