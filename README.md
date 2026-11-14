# RugbyXVNews

Site éditorial statique, autonome et compatible avec GitHub Pages. Le front-end ne dépend d'aucun framework.

## Publication
Dans le dépôt GitHub : Settings > Pages > Deploy from a branch > main > /(root). GitHub Pages publiera ensuite index.html à l'adresse indiquée dans les paramètres.

## Contenus à personnaliser avant publication
- Dans app.js, passer SHOW_PREVIEW_NOTICE à false lorsque les exemples ont été remplacés.
- Modifier le tableau articles : titre, rubrique, chapô, auteur, date, texte, temps de lecture et ton visuel.
- Modifier le tableau gallery et intégrer uniquement des photos/vidéos dont le média détient les droits.
- Vérifier l'adresse contact@rugbyxvnew.com et les URL des réseaux sociaux.
- Les résultats sont volontairement vides : brancher une API ou un flux de scores fiable avant de proposer du direct.

## Fonctionnalités front-end
Navigation par rubriques, pages article, recherche, filtres de galerie, aperçu modal, partage natif/copie de lien, menu mobile, responsive et structure HTML sémantique.

## Limites à connaître
Cette version est un front-end statique : aucun CMS, compte rédacteur, stockage de contenu, live score, classement calculé, newsletter ou formulaire serveur n'est inclus. Pour l'exploitation quotidienne d'un média, prévoir un CMS/API éditoriale, une source de résultats autorisée, une gestion des droits médias et un service de formulaire.

## Pages légales
Les pages Mentions légales et Confidentialité sont des modèles avec champs à compléter. Ne les considère pas comme des documents juridiques finalisés : l'éditeur doit renseigner son identité, l'hébergement exact, les responsabilités et les traitements réellement activés avant l'ouverture au public.
