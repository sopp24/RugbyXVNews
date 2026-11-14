# Données sportives

Ce fichier est lu par le front-end à l'adresse `./data/sports-data.json`. Les modules de résultats, calendriers, classements, clubs, joueurs, vidéos et podcasts sont déjà prêts à consommer ces tableaux.

## Règles éditoriales et de fiabilité
- Ne publier que des données issues d'une source autorisée et vérifiable.
- Toujours renseigner `sourceName` ou `sourceUrl` et `updatedAt` pour rendre la provenance et la fraîcheur visibles.
- Pour un match en direct, `status` doit valoir `live` et `updatedAt` doit être actualisé. Le site masque l'état « en direct » lorsque cette donnée date de plus de dix minutes.
- Utiliser les statuts `scheduled`, `live`, `finished` et `postponed`.
- Les scores doivent être numériques. Ne pas remplir les champs avec une estimation.
- Le dépôt ne contient pas de flux de données propriétaire ni de clé API.

## Exemple de rencontre
```json
{
  "id": "identifiant-match",
  "round": "Journée 1",
  "kickoff": "2026-09-05T18:00:00+02:00",
  "status": "scheduled",
  "home": "Nom du club recevant",
  "away": "Nom du club visiteur",
  "homeScore": null,
  "awayScore": null,
  "venue": "Stade",
  "updatedAt": "2026-09-05T12:00:00+02:00",
  "sourceName": "Nom de la source",
  "sourceUrl": "https://exemple.org/match"
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

## Fiches clubs et joueurs
Clubs : `name`, `competition`, `description`, `url`.
Joueurs : `name`, `position`, `description`, `url`.

Les données personnelles sensibles, informations médicales ou rumeurs non vérifiées ne doivent pas être intégrées à l'annuaire.
