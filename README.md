# Compte ta caisse

Portage web de [CountTheCashApp](https://github.com/Cdric-art/CountTheCashApp), l'application iPhone
qui sert à compter le fond de caisse et à clôturer la caisse.

## Écrans

| Route     | Équivalent iOS      | Contenu                                                              |
| --------- | ------------------- | -------------------------------------------------------------------- |
| `/`       | `HomeView`          | Titre, date et heure, bandes colorées, bascule clair / sombre         |
| `/fond`   | `CashFundView`      | Montant attendu, 13 coupures (quantité × valeur), total et écart      |
| `/caisse` | `CashRegisterView`  | Deux rapports de caisse, 7 moyens de paiement multi-lignes, écart     |

## Nouveautés par rapport à l'app iOS

- **Export PDF** : le bouton « Exporter en PDF » génère un relevé daté qui réunit le fond de
  caisse et la caisse, puis le télécharge. Les lignes laissées vides ne sont pas imprimées.
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

Les couleurs (Catppuccin) sont reprises de `Assets.xcassets` et déclarées en variables CSS dans
`app/globals.css`. Une seule valeur diffère : en thème sombre, `RedCat` valait `#3e6b5e`, un
vert-gris illisible sur le fond sombre, remplacé par `#f38ba8`.

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
