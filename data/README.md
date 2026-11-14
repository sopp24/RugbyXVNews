# Données RugbyXVNews

Le site lit trois fichiers JSON indépendants :
- **articles.json** : contenu éditorial et fiches article.
- **gallery.json** : albums et médias de la galerie.
- **sports-data.json** : compétitions, résultats, classements, clubs, joueurs, vidéos et podcasts.

Les fichiers sont servis en lecture seule depuis GitHub Pages. La rédaction les met à jour en modifiant le dépôt. Pour une mise à jour automatique des scores, ajouter une fonction de synchronisation côté serveur ou une action planifiée GitHub Actions alimentée par un fournisseur sous licence. Ne jamais exposer une clé API privée dans les fichiers JavaScript ou JSON publics.

## Format d'un article
Champs requis : id, title, category, type, author, published, read, excerpt, lead et sections.
Champs recommandés : tone, tags, image, imageAlt, imageCaption, datePublished, dateModified et demo.
La propriété sections contient un tableau de paires : titre de section puis paragraphe. Les identifiants doivent être uniques et stables. Les dates réelles doivent être au format ISO 8601 avec fuseau horaire.

## Format galerie
Champs requis : title, kind (Photo ou Vidéo), caption. Champs recommandés : tone, image, credit et demo.
Une URL d'image doit être HTTP(S) ou un chemin de fichier local au site. Les visuels doivent être libres de droits ou autorisés pour les usages prévus. Toujours renseigner un crédit lorsque requis.

## Format sportif
sports-data.json contient :
- provider, sourceUrl et updatedAt au niveau racine.
- competitions : tableau d'objets avec id, name, season, updatedAt, sourceName, sourceUrl, matches et standings.
- clubs, players, videos et podcasts : tableaux de fiches.

Un match peut utiliser les statuts scheduled, upcoming, live, finished ou postponed. Pour un match live, fournir un updatedAt récent. Le front-end n'affiche plus « EN DIRECT » au-delà de dix minutes depuis la dernière mise à jour connue. Les scores doivent être des nombres ; null signifie qu'aucun score n'est publié. Un match peut aussi contenir des tableaux facultatifs stats (label, home, away), events (minute, description) et lineups (home, away) pour alimenter la fiche détaillée.

## Exemple de match
```json
{
  "id": "game-001",
  "round": "Journée 1",
  "kickoff": "2026-09-05T18:00:00+02:00",
  "status": "scheduled",
  "home": "Club recevant",
  "away": "Club visiteur",
  "homeScore": null,
  "awayScore": null,
  "venue": "Nom du stade",
  "updatedAt": "2026-09-05T12:00:00+02:00",
  "sourceName": "Fournisseur de données",
  "sourceUrl": "https://example.org/match"
}
```

## Exemple de classement
```json
{
  "position": 1,
  "club": "Nom du club",
  "played": 0,
  "wins": 0,
  "draws": 0,
  "losses": 0,
  "points": 0
}
```

Les données de personnes doivent rester limitées aux informations publiques et pertinentes pour le rugby. Ne pas ajouter de données personnelles sensibles, d'informations médicales ni de rumeurs non vérifiées.


## Traductions françaises / anglaises
Le fichier **locales.json** contient :
- **ui** : dictionnaire des textes d'interface français vers anglais.
- **competitionTranslations** : titres et descriptions de chaque compétition.
- **articleTranslations** : traductions d'articles indexées par leur id stable ; renseigner au minimum title, excerpt, lead et sections. Traduire aussi category, type, author, published et tags lorsqu'ils diffèrent.
- **galleryTranslations** : traductions des titres et légendes de galerie.

Lorsqu'une nouvelle actualité est ajoutée dans articles.json, ajouter sa traduction dans locales.json sous le même id. Si une fiche de score, club, joueur, vidéo ou podcast comporte des champs anglais, utiliser des champs se terminant par **En** (ex. homeEn, awayEn, descriptionEn, nameEn) : le moteur les utilise comme traduction du champ français correspondant.
