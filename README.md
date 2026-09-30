# Compte ta caisse

Portage web de [CountTheCashApp](https://github.com/Cdric-art/CountTheCashApp), l'application iPhone
qui sert à compter le fond de caisse et à clôturer la caisse.

## Écrans

| Route     | Équivalent iOS      | Contenu                                                              |
| --------- | ------------------- | -------------------------------------------------------------------- |
| `/`       | `HomeView`          | Titre, date et heure, bandes colorées, bascule clair / sombre         |
| `/fond`   | `CashFundView`      | Montant attendu, 13 coupures (quantité × valeur), total et écart      |
| `/caisse` | `CashRegisterView`  | Deux rapports de caisse, 8 moyens de paiement, écart                  |

## Nouveautés par rapport à l'app iOS

- **Chèques vacances** : moyen de paiement ajouté entre les tickets restaurant et les dépenses.
- **Espèces** : un seul montant, sans ligne supplémentaire. Les six autres moyens de paiement
  gardent le bouton `+` de l'app iOS.
- **Export PDF** : le bouton « Exporter en PDF », sur l'écran Caisse, génère un relevé daté de la
  caisse, puis le télécharge. Les moyens de paiement laissés vides ne sont pas imprimés. Le fond
  de caisse n'y figure pas : il sert au comptage, pas à la clôture.
- **Réinitialiser** : vide l'écran courant.
- Les montants acceptent la virgule comme le point (`12,50` ou `12.50`).
- Le flux d'actualités NewsAPI de l'écran d'accueil n'a pas été repris : sa clé d'API était
  inscrite en clair dans le code, ce qui ne tient pas sur le web.

## État et persistance

Comme sur iPhone, la saisie ne survit pas à un rechargement de page. Elle est en revanche
conservée quand on passe d'un onglet à l'autre : l'état vit dans `components/CashProvider.tsx`,
monté par le layout racine, à l'image du `TabView` de l'app d'origine. Seul le choix du thème est
mémorisé, dans le `localStorage`.

## Palette

L'interface utilise [Rosé Pine](https://rosepinetheme.com) : la variante Dawn en thème clair,
la variante principale en thème sombre. Les valeurs proviennent de `rose-pine/palette`.

La palette ne compte que six accents (love, gold, rose, pine, foam, iris) là où l'app iOS en
utilisait dix. Ils cyclent sur les coupures et les moyens de paiement, de sorte que deux voisins
n'aient jamais la même couleur.

## Développement

```bash
bun install
bun run dev     # http://localhost:3000
bun run build
bun run lint
```

## Structure

```
app/
  layout.tsx          état partagé, thème, barre d'onglets
  page.tsx            accueil
  fond/page.tsx       fond de caisse
  caisse/page.tsx     caisse
components/
  CashProvider.tsx    tous les calculs (totaux, écarts)
  SummaryBar.tsx      capsules Total / Différence
  ActionBar.tsx       export PDF et réinitialisation
  TabBar.tsx          navigation du bas
  ThemeToggle.tsx     bascule clair / sombre
lib/
  denominations.ts    coupures et moyens de paiement
  money.ts            parsing des saisies, formatage en euros
  pdf.ts              génération du relevé
  hooks.ts            horloge et lecture du thème
```
