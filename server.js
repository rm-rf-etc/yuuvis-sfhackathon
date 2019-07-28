const server = require('http').createServer();
const path = require('path');
const Gun = require('gun');
require('gun/lib/path.js');
require('gun/lib/open.js');
require('gun/lib/load.js');
require('gun/lib/unset.js');

var AYLIENTextAPI = require('aylien_textapi');

const { debounce } = require('lodash');
// require('@notabug/gun-lmdb').attachToGun(Gun, {
//   path: path.resolve(__dirname, 'lmdb_database'),
//   mapSize: 1024 ** 2 // max size of database in bytes
// });
const gun = Gun({
  web: server,
  // radisk: false,
  localStorage: false,
});

server.listen(7700, () => console.info('Server listening on localhost:7700/gun'));

const seeds = {
  'user/1': {
    name: 'Janis Joplin',
    searchString: '',
  },
  'email/1': {
    summary: 'lorem ipsum',
    raw: 'lorem ipsum delor sit amit',
  },
  'email/2': {
    summary: 'lorem ipsum',
    raw: 'lorem ipsum delor sit amit',
  },
  'email/3': {
    summary: 'lorem ipsum',
    raw: 'lorem ipsum delor sit amit',
  },
  'email/4': {
    summary: 'lorem ipsum',
    raw: 'lorem ipsum delor sit amit',
  },
  'email/5': {
    summary: 'lorem ipsum',
    raw: 'lorem ipsum delor sit amit',
  },
};
const attachments = [
  ['thread/1', 'email/1'],
  ['thread/1', 'email/2'],
  ['thread/2', 'email/3'],
  ['thread/2', 'email/4'],
  ['thread/2', 'email/5'],
  ['user/1.threads', 'thread/1'],
  ['user/1.threads', 'thread/2'],
];

Object.entries(seeds).forEach(([key, val]) => {
  gun.get(key).put(val);
});
attachments.forEach(([parent, child]) => {
  gun.path(parent).set(gun.get(child));
});

const searchHandler = debounce((value) => {
  console.log(value);
}, 500, { 'maxWait': 1000 });

gun.path('user/1.searchString').on(searchHandler);


var textapi = new AYLIENTextAPI({
  application_id: "8e9d825d",
  application_key: "d515b564aa74cd8ccfeb10ffb2e8a99c"
});

async function summarize(email) {
    let summaries = email;
    textapi.summarize({
	'text': email,
	'title': 'placeholder'
    }, function(error, response) {
	if (error === null) {
	    console.log(response);
	    if (response.sentences.length === 0) {
		response.sentences.push(text);
	    }
	    summaries = response.sentences;
	}
    });
    return summaries;
}

