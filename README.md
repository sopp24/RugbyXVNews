# RugbyXVNews — le média rugby

Portail éditorial statique pour le rugby français et international. Le site est conçu pour GitHub Pages, sans framework ni dépendance de build.

## Expérience disponible
- Accueil média avec hiérarchie éditoriale, actualités à la une, rubriques, centre de match et médiathèque.
- Rubriques Top 14, Pro D2, Nationale et International avec onglets actualités, calendrier et classement.
- Centre de match : vues en direct, résultats, rencontres à venir et classements.
- Pages articles avec chapô, auteur, temps de lecture, sommaire, progression de lecture, partage, impression, favoris et réglage de la taille du texte.
- Recherche d'articles et filtres par rubrique et format.
- Annuaire de clubs et joueurs alimentable par données.
- Galerie, vidéos et podcasts.
- Mode clair/sombre persistant, interface française/anglaise persistante, navigation mobile type application, raccourci clavier de recherche, favoris locaux, PWA et page hors ligne.
- Mentions légales et confidentialité sous forme de modèles à compléter.

## Publier une nouvelle actualité
Éditer le fichier **data/articles.json** et ajouter un objet dans le tableau articles. Ajouter les champs traduits dans **data/locales.json** sous articleTranslations pour que l'article soit aussi disponible en anglais. Champs principaux :
- **id** : identifiant unique utilisé dans le lien de l'article.
- **title**, **category**, **type**, **author**, **published**, **read**.
- **excerpt** : chapô court ; **lead** : introduction.
- **sections** : tableau de paires [titre, paragraphe].
- **tone** : identifiant d’ambiance pour les médias de secours. La couleur de marque reste le violet officiel ; les photos et couleurs de maillots ne sont pas recolorisées.
- **image** : URL HTTP(S) ou chemin de fichier de l'image ; **imageAlt** : texte alternatif ; **imageCaption** : légende et crédit.
- **tags** : mots-clés utiles à la recherche.
- **datePublished** et **dateModified** : dates ISO 8601 lorsque l'article est réel.
- **demo** : true tant que le texte reste fictif ou de démonstration.

Les liens d'articles sont construits à partir de id. Garder un identifiant unique et stable après publication. Ne jamais présenter un contenu d'exemple comme une information vérifiée.

## Ajouter des photos ou vidéos
Éditer **data/gallery.json**. Pour chaque élément : title, kind (Photo ou Vidéo), caption, tone, et facultativement image (URL ou chemin). Utiliser de préférence AVIF/WebP, des dimensions adaptées, un poids raisonnable, une légende, un crédit et les droits de diffusion nécessaires. Les photos sont chargées en différé et utilisent des dimensions réservées pour limiter les décalages de mise en page.

## Résultats, calendriers et classements
Éditer **data/sports-data.json** ou connecter une source autorisée au pipeline de données. Le format, les statuts et les règles de fraîcheur sont décrits dans **data/README.md**.

**Aucun fournisseur de scores n'est connecté dans cette version.** Les données sont donc vides par défaut et le site ne fabrique pas de scores, classements, effectifs ou horaires. Les états de match en direct deviennent « direct non actualisé » si le dernier rafraîchissement date de plus de dix minutes. Pour un vrai direct automatique, il faut un fournisseur de données avec licence, un service de synchronisation et une fréquence de mise à jour définie.

## Configuration de prévisualisation et référencement
Dans **app.js**, passer **PREVIEW_MODE** à false uniquement lorsque les exemples ont été remplacés et les données contrôlées. Ce mode retire l'avertissement de démonstration, autorise l'indexation et active le balisage NewsArticle des pages article. Tant que le mode est actif, la page utilise noindex,nofollow pour éviter d'indexer le contenu fictif. Avant l'ouverture publique, modifier aussi la balise robots statique de index.html de noindex,nofollow vers index,follow.

**Conséquence SEO du verrouillage d'accès :** tant que le verrou SOPP Agents est actif, robots.txt contient `Disallow: /`, la ligne `Sitemap:` y est commentée et sitemap.xml est conservé mais inactif, et toutes les pages restent en noindex. Le site n'est donc pas référencé par les moteurs de recherche. Pour l'ouvrir au public : retirer sopp-gate.js des pages (et du précache de sw.js), passer PREVIEW_MODE à false, restaurer `Allow: /` et la ligne `Sitemap:` dans robots.txt, puis passer la balise robots de index.html et offline.html à index,follow.

Le sitemap utilise actuellement l'URL GitHub Pages par défaut **https://sopp24.github.io/RugbyXVNews/**. Si un domaine personnalisé est ajouté, mettre à jour les URLs dans **sitemap.xml**, **robots.txt** et le schéma site-schema de **index.html**.

## Déployer sur GitHub Pages
1. Ouvrir le dépôt, puis **Settings → Pages**.
2. Sélectionner **Deploy from a branch**, la branche **main**, puis **/(root)**.
3. Enregistrer. L'adresse publique apparaît sur la page Pages lorsque le déploiement est terminé.
4. À chaque mise à jour du site, le service worker est actualisé à sa version courante. Les pages HTML et les fichiers JSON sont servis réseau d'abord ; les autres ressources (app.js, style.css…) sont servies depuis le cache puis rafraîchies en arrière-plan. Incrémenter CACHE_NAME dans **sw.js** (et la vérification de scripts/check-site.mjs) à chaque évolution de la liste de précache ou de la stratégie de cache.

## Contrôles qualité
Le workflow GitHub Actions **.github/workflows/site-check.yml** vérifie la syntaxe JavaScript, les fichiers requis, le JSON et quelques invariants de données à chaque push et pull request.

## Limites de cette version
- C'est un front-end statique, pas un CMS : l'édition passe par les fichiers JSON du dépôt.
- Les favoris sont enregistrés dans le navigateur utilisé ; ils ne se synchronisent pas entre appareils.
- Le module newsletter est un point de contact, pas un système d'inscription actif.
- Aucun fournisseur de données sportives, outil d'analytics ou système publicitaire n'est connecté.
- Les URLs de page utilisent des paramètres de requête. Pour un média avec un volume éditorial élevé et un référencement avancé, prévoir à terme un CMS ou une génération de pages HTML statiques avec URLs propres par article.
- L'affichage est responsive et prévoit les principales largeurs d'écran, mais le contrôle final doit être effectué sur de vrais appareils et navigateurs, avec tests clavier et lecteur d'écran.

## Avant ouverture publique
- Remplacer le logo provisoire et les illustrations par les éléments de la charte et des médias autorisés.
- Renseigner les coordonnées éditoriales, crédits, mentions légales et politique de confidentialité.
- Remplacer tous les exemples dans **data/articles.json** et **data/gallery.json**.
- Connecter une source fiable pour les scores, calendriers et classements ou conserver les modules en attente.
- Vérifier le domaine du sitemap, les métadonnées sociales et les pages Pages.
- Faire une recette sur mobile iOS/Android, tablette, ordinateur, clavier et lecteur d'écran.


## Langues et thèmes
- Les préférences de langue et de thème sont conservées localement dans le navigateur (clés localStorage rxn-lang et rxn-theme).
- La commande FR / EN se trouve dans la barre de navigation persistante et recharge la page dans la langue choisie.
- Les traductions d'interface sont dans **data/locales.json** (objet ui). Les traductions des articles sont dans articleTranslations et celles de la galerie dans galleryTranslations.
- Le thème sombre officiel est appliqué par défaut. Le thème clair reste disponible comme alternative de lecture ; les deux préférences sont conservées localement.
- Pour une nouvelle publication, renseigner ses champs anglais dans data/locales.json. Le moteur de traduction utilise les valeurs françaises comme clés de correspondance.


## Direction artistique — charte Instagram Rugby XV News

La charte officielle du compte @rugby_xv_news est la référence visuelle du site. L'identité repose sur un trio strict : violet électrique, noir et blanc. Les autres couleurs visibles dans les médias proviennent des photos, maillots et logos de compétitions ; elles ne deviennent pas des couleurs de marque.

### Couleurs
- Violet de marque : **#5533EC** (rubriques, bandeaux, accents et titres surlignés).
- Noir : **#111111** (fond principal, arcs, navigation et grandes zones d'information).
- Blanc : **#FFFFFF** (texte, chiffres et pastilles de rang).
- Surface secondaire : **#1D1D1D** ; gris de barres de points : **#3C3C3C**.
- Violet clair : **#8A70FF** pour les textes violets sur fond noir ; violet profond : **#4326C4** pour les états pressés.
- Rouge cœur : **#E5405A**, réservé au motif cœur du podcast « Au cœur de la Nationale ».

### Typographie et logo
- Montserrat variable est auto-hébergée dans `assets/fonts/` (graisses variables, romain et italique). La licence SIL Open Font License est conservée dans `assets/fonts/OFL.txt`.
- Titres en capitales et graisses 800–900 ; scores en italique 900 avec chiffres tabulaires ; corps lisible à partir de la graisse 400.
- Les sujets de titres sont mis en évidence par un rectangle violet. Les accents des capitales sont conservés.
- Le mot-symbole textuel et le monogramme XV présents dans le site et l'icône sont des approximations temporaires. Remplacer par le logo source exact dès que ses fichiers SVG officiels (versions blanche, noire et violette) sont fournis.

### Formes, images et composants
- Arcs noirs sur fonds violets, bandeaux de surlignage rectangulaires, onglets inclinés et pastilles de rang blanches à angles droits.
- Pas d'ombre portée, pas de dégradé de marque, pas de carte arrondie. Seul le bas des photos reçoit un dégradé noir de lisibilité.
- Photos principales en portrait 4:5, vignettes en 3:4, titre et score reconstruits en HTML réel, crédit visible. Les photos ne sont jamais recolorisées ; les écussons et logos tiers ne sont jamais déformés.
- Les classements utilisent des rangs blancs, des barres de points gris et, sur mobile, une lecture compacte rang / club / points sans défilement horizontal.
- La navigation reste noire avec un soulignement violet de 3 px pour la rubrique active et un accès Podcasts violet.

La navigation mobile, la recherche, le mode de lecture clair optionnel, la langue FR/EN, les favoris et la PWA restent fonctionnels. Avant publication, confirmer le logo original et les licences de diffusion web des photographies, écussons et logos tiers.


## Verrouillage d'accès
- L'application est conçue pour être ouverte depuis **SOPP Agents** (https://sopp24.github.io/SOPP-agents/), qui se déverrouille par Face ID / Touch ID puis ouvre l'app avec un jeton dans le fragment d'URL.
- Un accès direct à l'adresse du site affiche un écran de verrouillage (script **sopp-gate.js**, chargé en premier dans index.html et offline.html).
- En développement, localhost / 127.0.0.1 contournent le verrou ; ajouter `?soppgate=force` à l'URL pour le forcer.
- Un dépôt statique public ne peut pas réellement cacher son code : une vraie protection nécessite un dépôt privé derrière le Worker authentifié (voir SOPP-agents/cloudflare-auth).
- Voir aussi la section « Configuration de prévisualisation et référencement » pour l'effet sur robots.txt et le sitemap.
