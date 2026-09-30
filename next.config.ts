import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * En développement, Next ne sert ses ressources qu'à localhost. Sans cette
   * entrée, ouvrir le site depuis un téléphone du réseau local affiche la page
   * mais aucun script : le thème et les calculs restent inertes.
   * À ajuster si l'adresse du poste change.
   */
  allowedDevOrigins: ["192.168.1.151"],
};

export default nextConfig;
