#!/usr/bin/env node
// Smoke tests du hook réseau VAFT exécutés sans navigateur ni requêtes externes.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';

const source = readFileSync(new URL('../twitch/vaft-ublock-origin-corrige.js', import.meta.url), 'utf8');
const header = 'twitch-videoad.js text/javascript\n';
assert.ok(source.startsWith(header), 'En-tête uBlock Origin invalide');
new Script(source.slice(header.length), { filename: 'vaft-ublock-origin-corrige.js' });

function extract(begin, end) {
    const start = source.indexOf(begin);
    const stop = source.indexOf(end, start);
    assert.ok(start >= 0 && stop > start, 'Fonction introuvable : ' + begin);
    return source.slice(start, stop);
}

const hookSource = extract('    function hookFetch() {', '    function onContentLoaded() {');
const calls = [];
const events = [];
const warnings = [];
const fakeWindow = {
    fetch(...args) {
        calls.push(args);
        return Promise.resolve({ ok: true });
    }
};
const factory = new Function(
    'window', 'URL', 'Headers', 'Request', 'location', 'postTwitchWorkerMessage', 'console',
    `
    let GQLDeviceID = null;
    let ClientVersion = null;
    let ClientSession = null;
    let ClientIntegrityHeader = null;
    let AuthorizationHeader = undefined;
    const ForceAccessTokenPlayerType = 'popout';
    ${hookSource}
    hookFetch();
    return {
        snapshot: () => ({ GQLDeviceID, ClientVersion, ClientSession, ClientIntegrityHeader, AuthorizationHeader })
    };
    `
);
const instance = factory(
    fakeWindow, URL, Headers, Request,
    { href: 'https://www.twitch.tv/channel' },
    (key, value) => events.push([key, value]),
    { log() {}, warn(...args) { warnings.push(args); } }
);

await fakeWindow.fetch('https://gql.twitch.tv/gql');
assert.equal(calls.length, 1, 'fetch sans init a échoué');

await fakeWindow.fetch('https://gql.twitch.tv/gql', {
    headers: [['X-Device-Id', 'dev1'], ['Client-Version', 'v1']]
});
assert.equal(instance.snapshot().GQLDeviceID, 'dev1');
assert.equal(instance.snapshot().ClientVersion, 'v1');

await fakeWindow.fetch(new Request('https://gql.twitch.tv/gql', {
    headers: { Authorization: 'OAuth test' }
}), { headers: new Headers({ 'Client-Session-Id': 'session1' }) });
assert.equal(instance.snapshot().ClientSession, 'session1');
assert.equal(instance.snapshot().AuthorizationHeader, 'OAuth test');

const original = {
    headers: { 'Client-Version': 'v1' },
    body: JSON.stringify({
        operationName: 'PlaybackAccessToken',
        variables: { playerType: 'site' }
    })
};
await fakeWindow.fetch('https://gql.twitch.tv/gql', original);
assert.equal(JSON.parse(original.body).variables.playerType, 'site', 'Objet appelant modifié');
assert.equal(JSON.parse(calls.at(-1)[1].body).variables.playerType, 'popout', 'Réécriture du playerType absente');

await fakeWindow.fetch('https://not-twitch.example/gql', {
    headers: { 'X-Device-Id': 'evil' }
});
assert.equal(instance.snapshot().GQLDeviceID, 'dev1', 'Interception hors de Twitch');

await fakeWindow.fetch('https://gql.twitch.tv/gql', {
    headers: new Headers(),
    body: 'invalid PlaybackAccessToken JSON'
});
assert.equal(warnings.length, 1, 'JSON invalide sans avertissement');
assert.ok(events.some(([name]) => name === 'UpdateDeviceId'));
assert.ok(events.some(([name]) => name === 'UpdateClientVersion'));

const timeSource = extract('    function getServerTimeFromM3u8(', '    function replaceServerTimeInM3u8(');
for (const flag of [false, true]) {
    const getTime = new Function('V2API', timeSource + '\nreturn getServerTimeFromM3u8;')(flag);
    assert.equal(getTime('#EXTM3U\n#EXTINF:3.0,'), null, 'Balise SERVER-TIME facultative');
}
console.log('OK: hook fetch VAFT (6 scénarios), headers Request, isolement du domaine, réponse JSON, parsing des playlists.');
