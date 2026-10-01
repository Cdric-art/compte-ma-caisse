import { routeMetadata } from "@/lib/site";

/**
 * La page est un Client Component : elle ne peut pas exporter `metadata`.
 * Ce layout, rendu sur le serveur, porte donc les métadonnées de la route.
 */
export const metadata = routeMetadata({
  title: "Fond de caisse",
  description:
    "Comptez billets et pièces coupure par coupure, et comparez le total au fond de caisse attendu.",
  path: "/fond",
});

export default function FondLayout({ children }: LayoutProps<"/fond">) {
  return children;
}
