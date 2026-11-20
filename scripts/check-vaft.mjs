#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import assert from 'node:assert/strict';

const file = readFileSync(new URL('../twitch/vaft-ublock-origin-corrige.js', import.meta.url), 'utf8');
const header = 'twitch-videoad.js text/javascript\n';
assert.ok(file.startsWith(header), 'En-tête de scriptlet uBO manquant');
new Script(file.slice(header.length), { filename: 'vaft-ublock-origin-corrige.js' });
assert.ok(file.includes('const ourTwitchAdSolutionsVersion = 25;'));
assert.ok(file.includes('VAFT: GraphQL request timed out'));
assert.ok(file.includes("new Headers("));
assert.ok(file.includes('return matchedResolutionUrl || closestResolutionUrl;'));
assert.ok(file.includes('MIT License'));
const filters = readFileSync(new URL('../twitch/twitch-filters.txt', import.meta.url), 'utf8');
assert.ok(filters.split(/\r?\n/).some(line => line.trim() === 'twitch.tv##+js(twitch-videoad)'));
console.log('OK : syntaxe du scriptlet, correctifs essentiels, licence et liste de filtres.');
