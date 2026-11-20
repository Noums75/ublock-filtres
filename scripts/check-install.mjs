#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const file = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const active = text => text.split(/\r?\n/).map(s => s.trim()).filter(s => s && !s.startsWith('!'));
const readme = file('README.md');
const combined = file('filtres-complets.txt');
const twitch = file('twitch/twitch-filters.txt');
const youtube = file('youtube/youtube-filters.txt');
const resource = file('twitch/vaft-ublock-origin-corrige.js');
const rawList = 'https://raw.githubusercontent.com/Noums75/ublock-filtres/main/filtres-complets.txt';
const rawResource = 'https://raw.githubusercontent.com/Noums75/ublock-filtres/main/twitch/vaft-ublock-origin-corrige.js';

assert.ok(readme.startsWith('# ✨ StreamClean uBO'));
assert.ok(readme.includes(rawList) && readme.includes(rawResource));
assert.ok(readme.includes('userResourcesLocation'));
assert.doesNotMatch(readme, /actuellement privé|une fois le dépôt rendu public/i);
const links = [...readme.matchAll(/https:\/\/subscribe\.adblockplus\.org\/\?[^)\s]+/g)];
assert.ok(links.length >= 2, 'Manque les liens d’abonnement');
const targets = links.map(match => new URL(match[0]).searchParams.get('location'));
assert.ok(targets.includes(rawList), 'L’abonnement principal ne cible pas la liste complète');
assert.ok(targets.includes('https://raw.githubusercontent.com/Noums75/ublock-filtres/main/youtube/youtube-filters.txt'));
assert.deepEqual(active(combined), [...active(twitch), ...active(youtube)], 'Liste complète non synchronisée');
assert.equal(new Set(active(combined)).size, active(combined).length);
assert.match(combined, /^! Title: StreamClean uBO/m);
assert.ok(resource.startsWith('twitch-videoad.js text/javascript\n'));
assert.ok(file('youtube/README.md').includes('../README.md'), 'README YouTube obsolète');
console.log('OK: installation StreamClean, liens, documentation et compatibilité des listes.');
