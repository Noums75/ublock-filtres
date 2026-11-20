#!/usr/bin/env node
// Vérifie les règles YouTube sans modifier le lecteur.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const activeRules = text => text.split(/\r?\n/).map(s => s.trim()).filter(s => s && !s.startsWith('!'));

const youtube = activeRules(read('../youtube/youtube-filters.txt'));
const optional = activeRules(read('../youtube/youtube-interface-optionnel.txt'));
const twitch = activeRules(read('../twitch/twitch-filters.txt'));
const combined = activeRules(read('../filtres-complets.txt'));

assert.ok(youtube.length >= 6 && youtube.length <= 20, 'Nombre de règles non prévu');
assert.ok(optional.length >= 2 && optional.length <= 10, 'Liste optionnelle incomplète');
assert.equal(new Set(youtube).size, youtube.length, 'Doublons YouTube');
assert.equal(new Set(combined).size, combined.length, 'Doublons liste combinée');
assert.deepEqual(combined, [...twitch, ...youtube], 'La liste complète doit réunir Twitch et YouTube seulement');
for (const rule of [...youtube, ...optional]) {
    assert.match(rule, /^(?:youtube\.com|m\.youtube\.com)##(?:#|\.|ytd-|ytm-)/,
      'Règle non cosmétique ou domaine inattendu : ' + rule);
    assert.doesNotMatch(rule, /\+js\(|googlevideo|#movie_player|#player-ads|ytp-ad|playerResponse|ytInitialPlayerResponse/i,
      'Interception vidéo ou règle risquée : ' + rule);
}
assert.ok(read('../youtube/README.md').includes('Quick fixes'), 'Instructions uBO manquantes');
console.log('OK: règles YouTube cosmétiques, fichiers optionnels et liste combinée cohérents.');
