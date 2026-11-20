# YouTube — filtres uBlock Origin

## Pourquoi pas un second VAFT ?

Twitch utilise notamment des publicités intégrées au flux vidéo. Pour **YouTube**, les listes officielles d'[uBlock Origin](https://github.com/uBlockOrigin/uAssets) disposent déjà de règles et scriptlets complexes, fréquemment ajustés. Les recopier dans un script maison risque de figer une version périmée, d'entraîner des conflits ou de bloquer la lecture.

Ce module fournit donc **des filtres supplémentaires pour certains emplacements publicitaires dans l'interface**. Il n'intercepte **pas** les requêtes `googlevideo.com`, ne remplace pas les réponses du lecteur et n'ajoute pas de proxy, de serveur externe ou de collecte d'information.

## Fichiers

- [youtube-filters.txt](youtube-filters.txt) : publicités d'interface (ad-slots, promotions et masthead).
- [youtube-interface-optionnel.txt](youtube-interface-optionnel.txt) : optionnel, masque des étagères Shorts et les cartes de fin de vidéo.

## Installation actuelle (dépôt privé)

1. Dans **uBlock Origin complet**, conserver les listes fournies par défaut, dont **uBlock filters – Ads** et **uBlock filters – Quick fixes**, et mettre les listes à jour dans le tableau de bord.
2. Ouvrir `youtube-filters.txt` sur ce dépôt avec votre compte GitHub, copier les règles actives (lignes sans `!`) dans **uBlock Origin → Mes filtres**, puis **Appliquer les changements**.
3. Recharger YouTube. La liste optionnelle peut s'ajouter de la même façon si souhaité.
4. Si une vidéo ne démarre pas, **désactiver d'abord les règles personnalisées YouTube** pour diagnostiquer ; vérifier ensuite que les listes officielles sont à jour. Éviter d'utiliser simultanément plusieurs bloqueurs publicitaires qui injectent leurs propres scriptlets.

**Pas besoin de `userResourcesLocation` pour YouTube** : cette propriété reste réservée à la configuration de Twitch déjà présente dans ce dépôt.

## Après publication du dépôt (facultatif)

Sous **Listes de filtres → Importer**, utiliser :

```text
https://raw.githubusercontent.com/Noums75/ublock-filtres/main/youtube/youtube-filters.txt
```

Pour activer Twitch et YouTube en une seule souscription (au lieu des listes séparées) :

```text
https://raw.githubusercontent.com/Noums75/ublock-filtres/main/filtres-complets.txt
```

**Important :** ces URL ne sont pas accessibles directement à uBO tant que le dépôt est privé. Le propriétaire doit choisir lui-même s'il souhaite changer sa visibilité. Ne pas placer de jeton d'accès GitHub dans les URL.

## Limites et dépannage

- Le filtrage de **publicités vidéo (pré-roll et mid-roll)** dépend principalement des filtres officiels d'uBO, **pas** de ce fichier complémentaire.
- Les sélecteurs d'interface sont susceptibles de changer après des mises à jour de YouTube.
- Les extensions uBlock Origin Lite, les applications mobiles YouTube et les TV connectées ne sont pas ciblées.
- Pour un problème lié à une publicité vidéo ou à la détection d'un bloqueur, actualiser d'abord les listes officielles, notamment **Quick fixes**, avant d'ajouter d'autres règles personnalisées.
- **Ne pas** masquer `#movie_player`, `#player-ads`, le lecteur, ou bloquer `googlevideo.com` : cela peut entraîner un écran noir ou un lecteur défectueux.

### Références

- [Filtres officiels uBO](https://github.com/uBlockOrigin/uAssets)
- [Correctifs rapides uBO](https://github.com/uBlockOrigin/uAssets/blob/master/filters/quick-fixes.txt)

Vérification de la syntaxe et des règles : `node scripts/check-youtube.mjs` ; la CI GitHub Actions lance cette vérification à chaque modification.
