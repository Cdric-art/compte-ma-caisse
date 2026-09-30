/**
 * Caisse enregistreuse dessinée au trait, dans le même langage graphique que
 * les icônes de la barre de navigation. En SVG plutôt qu'en bitmap : net à
 * toute densité, et les couleurs suivent le thème.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Ticket qui sort, haut déchiré */}
      <path d="M13 28V13l3.5 2 3.5-2 3.5 2 3.5-2v15" />
      <path d="M18 19h5M18 23h5" stroke="var(--gold)" />

      {/* Écran */}
      <rect x="35" y="15" width="17" height="13" rx="2.5" />
      <path d="M39 21.5h9" stroke="var(--foam)" />

      {/* Corps */}
      <rect x="6" y="28" width="52" height="26" rx="4" />

      {/* Séparation du tiroir et sa poignée */}
      <path d="M6 43h52M27 48.5h10" />

      {/* Touches */}
      <path d="M14 35.5h.01M21 35.5h.01M28 35.5h.01" stroke="var(--iris)" strokeWidth="3.5" />
    </svg>
  );
}
