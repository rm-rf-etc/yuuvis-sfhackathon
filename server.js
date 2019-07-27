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
  'page/1': {
    url: '/',
    component_name: 'Homepage',
    display_title: 'Our Slogan',
    page_title: 'Welcome!',
  },
  'page/2': {
    url: '/products',
    component_name: 'Products',
    display_title: 'Our Slogan Again!',
    page_title: 'Whoa, products!',
  },
  'row/1': {
    component_name: 'TwoColumnFeaturedImage',
    display_title: 'Row Title Two',
    display_content: 'Filler content filler content filler content.',
    orientation: 'image_left',
  },
  'row/2': {
    component_name: 'TwoColumnFeaturedImage',
    display_title: 'Row Title Three',
    display_content: 'Filler content filler content filler content.',
    orientation: 'image_right',
  },
  'row/3': {
    component_name: 'OneColumnRow',
    display_title: 'Row Title One',
    display_content: 'Filler content filler content filler content.',
  },
  'row/4': {
    component_name: 'CategoriesRow',
    display_title: 'What can you do with CollabNet?',
    display_content: 'Filler content filler content filler content.',
  },
};
const attachments = [
  ['pages', 'page/1'],
  ['pages', 'page/2'],
  ['page/1.rows', 'row/1'],
  ['page/1.rows', 'row/2'],
  ['page/1.rows', 'row/3'],
  ['page/2.rows', 'row/3'],
  ['page/2.rows', 'row/4'],
];

Object.entries(seeds).forEach(([key, val]) => {
  gun.get(key).put(val);
});
attachments.forEach(([parent, child]) => {
  gun.path(parent).set(gun.get(child));
});
