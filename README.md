# ✨ StreamClean uBO

**Des filtres simples pour YouTube et Twitch, avec uBlock Origin.** Gratuits et mis à jour automatiquement.

> [!NOTE]
> Compatible avec **uBlock Origin complet** (Firefox recommandé). Pas avec uBlock Origin Lite, les applications mobiles YouTube/Twitch ou les téléviseurs. Aucune suppression de publicité n'est garantie à 100 %.

## 🚀 Installer StreamClean

1. **Installe [uBlock Origin sur Firefox](https://addons.mozilla.org/fr/firefox/addon/ublock-origin/)**, si nécessaire.
2. **[✅ AJOUTER STREAMCLEAN À UBLOCK ORIGIN](https://subscribe.adblockplus.org/?location=https%3A%2F%2Fraw.githubusercontent.com%2FNoums75%2Fublock-filtres%2Fmain%2Ffiltres-complets.txt&title=StreamClean%20uBO%20-%20YouTube%20et%20Twitch)** — accepte l'abonnement proposé par l'extension.

**Pour YouTube, c'est terminé.** StreamClean masque des emplacements publicitaires ; les publicités intégrées aux vidéos sont principalement prises en charge par les listes officielles d'uBlock Origin. Garde-les activées et à jour.

### 🟣 Pour Twitch : une étape de plus

L'abonnement ci-dessus ajoute la règle Twitch. Pour activer le script expérimental **VAFT** :

1. Dans uBlock Origin, ouvre le **tableau de bord → Paramètres**.
2. Coche **« Je suis un utilisateur avancé »**, puis clique sur la **roue dentée** à côté.
3. Dans **userResourcesLocation**, ajoute cette adresse (sans effacer les autres URL déjà présentes) :

       https://raw.githubusercontent.com/Noums75/ublock-filtres/main/twitch/vaft-ublock-origin-corrige.js

4. **Enregistre**, mets à jour les listes dans l'onglet **Listes de filtres**, puis recharge Twitch.

⚠️ **VAFT est expérimental.** Si Twitch affiche un écran noir ou une erreur, retire l'adresse de VAFT de **userResourcesLocation**, enregistre et recharge le site. Évite d'exécuter plusieurs scripts Twitch simultanément.

Si le script ne s'active pas malgré cette configuration, ouvre **Mes filtres** et vérifie que la règle `twitch.tv##+js(twitch-videoad)` est présente et active (tu peux l'ajouter manuellement pour diagnostiquer). Après modification, applique les changements et recharge Twitch.

**État des validations :** tests automatisés de syntaxe et simulation des requêtes réseau. **Aucun test de blocage en conditions réelles sur YouTube ou Twitch** n'a été effectué ; le site peut modifier ses mécanismes à tout moment.

## 🔗 Si le bouton d'installation ne fonctionne pas

Ouvre **uBlock Origin → Listes de filtres → Importer**, colle ce lien et valide :

    https://raw.githubusercontent.com/Noums75/ublock-filtres/main/filtres-complets.txt

Tu peux aussi **[installer uniquement YouTube](https://subscribe.adblockplus.org/?location=https%3A%2F%2Fraw.githubusercontent.com%2FNoums75%2Fublock-filtres%2Fmain%2Fyoutube%2Fyoutube-filters.txt&title=StreamClean%20uBO%20-%20YouTube)**.

## ❓ Questions fréquentes

- **Mises à jour ?** L'abonnement aux listes est actualisé par uBlock Origin.
- **Publicités vidéo YouTube ?** StreamClean est un complément des filtres officiels uBO ; il ne garantit pas le blocage des publicités vidéo.
- **Twitch ne fonctionne pas ?** La règle Twitch seule ne suffit pas : VAFT nécessite le réglage avancé décrit ci-dessus.
- **Comment désinstaller ?** Supprime StreamClean des listes personnalisées d'uBlock Origin. Si tu as activé Twitch, retire aussi l'URL VAFT de **userResourcesLocation**.
- **Problème ?** Mets les listes officielles à jour, puis teste en désactivant les filtres personnalisés.

---

<details>
<summary>📁 Fichiers, options et crédits</summary>

- [Liste principale YouTube + Twitch](filtres-complets.txt) — le seul abonnement nécessaire.
- [Script VAFT corrigé](twitch/vaft-ublock-origin-corrige.js) — ressource externe nécessaire à Twitch.
- [Filtres optionnels pour masquer les Shorts et les cartes de fin](youtube/youtube-interface-optionnel.txt) — **désactivés par défaut**.
- [Explications YouTube](youtube/README.md), [licence MIT de VAFT](twitch/LICENSE-MIT.txt) et [scripts de vérification](scripts).

Ce projet n'est affilié ni à YouTube, ni à Twitch, ni à uBlock Origin. Le script Twitch provient de [TwitchAdSolutions](https://github.com/pixeltris/TwitchAdSolutions), avec ses notices de licence MIT conservées. Les anciennes URL des fichiers séparés sont préservées pour la compatibilité.

</details>
