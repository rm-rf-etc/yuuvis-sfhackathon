const server = require('http').createServer();
const path = require('path');
const Gun = require('gun');
require('gun/lib/path.js');
require('gun/lib/open.js');
require('gun/lib/load.js');
require('gun/lib/unset.js');
// require('@notabug/gun-lmdb').attachToGun(Gun, {
//   path: path.resolve(__dirname, 'lmdb_database'),
//   mapSize: 1024 ** 2 // max size of database in bytes
// });
const gun = Gun({
  web: server,
  radisk: false,
  localStorage: false,
});

server.listen(7700, () => console.info('Server listening on localhost:7700/gun'));

const seeds = {
  'client/1': {
    url: '/',
    name: 'Janis Joplin',
  },
  'client/2': {
    name: 'John Jacob Jingleheimer Schmidt',
  },
  'meta/1': {
    data: 'lorem of the ipsums',
  },
  'meta/2': {
    data: 'delor sit amit',
  },
  'meta/3': {
    data: '123534578',
  },
  'meta/4': {
    data: 'filler!',
  },
};
const attachments = [
  ['clients', 'client/1'],
  ['clients', 'client/2'],
  ['client/1.metas', 'meta/1'],
  ['client/1.metas', 'meta/2'],
  ['client/1.metas', 'meta/3'],
  ['client/2.metas', 'meta/3'],
  ['client/2.metas', 'meta/4'],
];

Object.entries(seeds).forEach(([key, val]) => {
  gun.get(key).put(val);
});
attachments.forEach(([parent, child]) => {
  gun.path(parent).set(gun.get(child));
});
