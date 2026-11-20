# ublock-filtres

Filtres personnels pour **uBlock Origin (version complète)** : scriptlet **VAFT** corrigé pour Twitch et liste complémentaire pour **YouTube**.

## Fichiers

- [twitch/vaft-ublock-origin-corrige.js](twitch/vaft-ublock-origin-corrige.js) : scriptlet VAFT complet, corrigé et autonome.
- [twitch/twitch-filters.txt](twitch/twitch-filters.txt) : règle uBlock Origin pour lancer le scriptlet sur Twitch.
- [twitch/LICENSE-MIT.txt](twitch/LICENSE-MIT.txt) : licence et attribution du projet initial.
- [scripts/check-vaft.mjs](scripts/check-vaft.mjs) : vérifications statiques et syntaxiques, utilisées par GitHub Actions.

## YouTube

- [youtube/youtube-filters.txt](youtube/youtube-filters.txt) : filtres complémentaires des emplacements publicitaires YouTube.
- [youtube/youtube-interface-optionnel.txt](youtube/youtube-interface-optionnel.txt) : masquage facultatif des Shorts et des cartes de fin.
- [youtube/README.md](youtube/README.md) : installation, limites et dépannage YouTube.
- [filtres-complets.txt](filtres-complets.txt) : liste commune **Twitch + YouTube**, à utiliser à la place des listes séparées.
- [scripts/check-youtube.mjs](scripts/check-youtube.mjs) : tests des règles et de leur cohérence.

**YouTube :** conserver les listes officielles d'uBlock Origin actives et à jour (notamment `uBlock filters – Ads` et `uBlock filters – Quick fixes`). Les filtres de ce dépôt sont **complémentaires** et n'altèrent pas le lecteur vidéo. Tant que le dépôt est privé, copier les règles de [youtube-filters.txt](youtube/youtube-filters.txt) dans **Mes filtres**. Une fois le dépôt public, on peut importer l'URL :

```text
https://raw.githubusercontent.com/Noums75/ublock-filtres/main/youtube/youtube-filters.txt
```

Pour utiliser un seul lien Twitch + YouTube après publication, importer plutôt `filtres-complets.txt`, sans doubler les abonnements séparés. Twitch nécessite toujours sa ressource `userResourcesLocation` indiquée ci-dessous.

## Installation Twitch

**Important : ce dépôt est actuellement privé.** La configuration ci-dessous n'est utilisable avec l'URL `raw.githubusercontent.com` **qu'une fois le dépôt rendu public** (Paramètres du dépôt → Général → Zone de danger → Modifier la visibilité). N'utilisez pas de jeton GitHub personnel dans `userResourcesLocation`. Le changement de visibilité doit être décidé par le propriétaire du dépôt.

1. Installer **uBlock Origin** (extension complète, pas uBlock Origin Lite).
2. Ouvrir le tableau de bord d'uBlock Origin → **Paramètres** → cocher **Je suis un utilisateur avancé**, puis ouvrir les paramètres avancés.
3. Mettre dans `userResourcesLocation` cette URL (après publication du dépôt) :

   ```text
   https://raw.githubusercontent.com/Noums75/ublock-filtres/main/twitch/vaft-ublock-origin-corrige.js
   ```

   Si la propriété contient déjà d'autres ressources, conserver les URL existantes en les séparant par des espaces. Supprimer toute ancienne URL VAFT en doublon.
4. Sous **Mes filtres**, ajouter :

   ```text
   twitch.tv##+js(twitch-videoad)
   ```

   Autre possibilité : sous **Listes de filtres → Importer**, utiliser l'URL de liste (uniquement après publication) :

   ```text
   https://raw.githubusercontent.com/Noums75/ublock-filtres/main/twitch/twitch-filters.txt
   ```

   Ne pas installer simultanément la règle manuelle et la liste si l'une est déjà active.
5. Appliquer les changements, recharger Twitch et vérifier le résultat.

## Modifications VAFT

La base provient de `pixeltris/TwitchAdSolutions`, révision
`f8f86706daf90daa534b26bce5b2f01238667d5f` (blob SHA-1 :
`a89a308f87b33f01f3c7d663366e52dc7d6ae020`).

Les correctifs renforcent : validation des URL Twitch GraphQL, support de `fetch()` avec `Request`/`Headers` ou paramètres absents, gestion d'erreurs et de délais pour GraphQL, réécriture des playlists M3U8, contrôles de métadonnées codec facultatives, meilleure sélection de résolution, gestion des Workers et suivi du statut anti-buffering.

**Limites :** aucune garantie de blocage systématique des publicités ; Twitch peut modifier sa diffusion à tout moment. Les tests automatiques ne remplacent pas un essai réel sur Twitch. Éviter l'utilisation simultanée de plusieurs scriptlets Twitch interférant entre eux. La compatibilité est ciblée sur uBlock Origin complet, notamment Firefox. Ce scriptlet n'est pas une simple liste de filtres et exige `userResourcesLocation`.

## Droits et attribution

Code dérivé de [pixeltris/TwitchAdSolutions](https://github.com/pixeltris/TwitchAdSolutions), distribué sous licence **MIT**. Le texte intégral est conservé dans `twitch/LICENSE-MIT.txt` et le fichier JavaScript distribué. Le dépôt d'origine est archivé ; cette version n'est pas une mise à jour officielle.
