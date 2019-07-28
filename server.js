const server = require('http').createServer();
const axios = require('axios');
const path = require('path');
const Gun = require('gun');
require('gun/lib/open.js');
require('gun/lib/load.js');
require('gun/lib/unset.js');

const yuuvisSearch = axios.create({
  baseURL: 'https://api.yuuvis.io',
  headers: {'Ocp-Apim-Subscription-Key': '07e8d29a9b924834932472703ba32c06'}
});

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
    searchResults: {},
  },
  'user/2': {
    name: 'Bob Dylan',
    searchString: '',
    searchResults: {},
  },
  'summary/1': {
    highlighted: false,
    textValue: `Up to 75% of farmers rely on pumped groundwater to water their crops and water use is intensifying – at the same time that satellite images shows supplies are shrinking alarmingly.`,
  },
  'summary/2': {
    highlighted: false,
    textValue: `Up to 75% of farmers rely on pumped groundwater to water their crops and water use is intensifying – at the same time that satellite images shows supplies are shrinking alarmingly.`,
  },
  'summary/3': {
    highlighted: false,
    textValue: `The nature of the problem is revealed by US Geological Survey figures, which show that the total amount of fresh water on Earth comes to about 10.6m cubic km.`,
  },
  'summary/4': {
    highlighted: false,
    textValue: `By contrast, the total volume from lakes and rivers, humanity’s main source of fresh water, produces a sphere that is a mere 56 km in diameter.`,
  },
  'summary/5': {
    highlighted: false,
    textValue: `By contrast, the total volume from lakes and rivers, humanity’s main source of fresh water, produces a sphere that is a mere 56 km in diameter.`,
  },
  'email/1': {
    highlighted: false,
    from: 'user/1',
    to: 'user/2',
    subject: 'LEGAL SIGN OFF MEETING - MONDAY, 9TH AUGUST',
    body: `As requested a "final" meeting has been arranged on Monday, 9th August at 
Clifford Chance (a room has been booked for the full day).  Could you please 
let me know asap if this is going to be a problem. I am waiting to hear from David Gilbert/Ken Raisler of Sullivan & Cromwell to 
ascertain who will be attending.  I will follow up this pm.

Andrew Wilkinson will not be able to attend this meeting - he is on paternity 
leave at present.`,
    notes: {
      '0': '"final" meeting has been arranged on Monday',
      '1': 'Could you please \nlet me know asap if this is going to be a problem.',
      '2': 'Andrew Wilkinson will not be able to attend this meeting',
    },
  },
  'email/2': {
    highlighted: false,
    from: 'user/1',
    to: 'user/2',
    subject: 'LEGAL SIGN OFF MEETING - MONDAY, 9TH AUGUST',
    body: `Is Mark Taylor aware of Gary's plans?  I know from my conversations with Mark 
about support for trading in South America that very few people in Enron, 
other than Don and a few commercial guys in Brazil, believe that there will 
be any action to speak of on the trading side in South America.  If Gary does 
anything other than trade from ECT on exchange or through swaps that he will 
have to take into consideration who will provide legal and administrative 
support and from where.`,
      notes: {
          '0': 'Is Mark Taylor aware of Gary\'s plans?',
          '1': ' Don and a few commercial guys in Brazil, believe that there will \nbe any action to speak of on the trading side in South America',
          '2': 'take into consideration who will provide legal and administrative \nsupport and from where',
      },
  },
  'email/3': {
    highlighted: false,
    from: 'user/1',
    to: 'user/2',
    subject: 'LEGAL SIGN OFF MEETING - MONDAY, 9TH AUGUST',
      body: `Gary is going to provide me with a list of OTC products for priority trading.  He has been in discussions with tax and structuring in Houston for the S. Cone.  The group has considered (i) trading onshore, (ii) trading as a sub of Elektro (and can this be a sub of an offshore entity?) and (iii) trading offshore.  They have studied the CC5 account requirements and have had conversations wtih JP Morgan and BofA.  There appears to be little communication with anyone in Brazil and Joe Kishkill is going to Sao Paulo next week.  I'll be more specific in a day or so.  I'm still having problems tying into the database (this is ridiculous!).  Did you receive my voice mail?  SS`,
      notes: {
          '0': 'Gary is going to provide me with a list of OTC products for priority trading.',
          '1': 'The group has considered (i) trading onshore, (ii) trading as a sub of Elektro (and can this be a sub of an offshore entity?)',
          '2': 'and (iii) trading offshore.',
      },
  },
  'email/4': {
    highlighted: false,
    from: 'user/1',
    to: 'user/2',
    subject: 'LEGAL SIGN OFF MEETING - MONDAY, 9TH AUGUST',
    body: `EMAIL 4 Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.`,
  },
  'email/5': {
    highlighted: false,
    from: 'user/1',
    to: 'user/2',
    subject: 'LEGAL SIGN OFF MEETING - MONDAY, 9TH AUGUST',
    body: `EMAIL 5 Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.`,
  },
};
const attachments = [
  [gun.get('users'), gun.get('user/1')],
  [gun.get('users'), gun.get('user/2')],
  [gun.get('thread/1'), gun.get('email/1')],
  [gun.get('thread/1'), gun.get('email/2')],
  [gun.get('thread/2'), gun.get('email/3')],
  [gun.get('thread/2'), gun.get('email/4')],
  [gun.get('thread/2'), gun.get('email/5')],
  [gun.get('email/1').get('summaries'), gun.get('summary/1')],
  [gun.get('email/2').get('summaries'), gun.get('summary/2')],
  [gun.get('email/3').get('summaries'), gun.get('summary/3')],
  [gun.get('email/4').get('summaries'), gun.get('summary/4')],
  [gun.get('email/5').get('summaries'), gun.get('summary/5')],
  [gun.get('user/1').get('threads'), gun.get('thread/1')],
  [gun.get('user/1').get('threads'), gun.get('thread/2')],
];

Object.entries(seeds).forEach(([key, val]) => {
  gun.get(key).put(val);
});
attachments.forEach(([parent, child]) => {
  parent.set(child);
});


// const searchHandler = async (userId, value) => {
const searchHandler = async (value) => {

  return console.log(value);

  /*
  const { data } = await yuuvisSearch.post('/dms/objects/search', {
    query: {
      maxItems: 50,
      statement: `SELECT * FROM enaio:object WHERE CONTAINS('${value}')`,
      skipCount: 0,
    },
  });

  let matches = null;
  if (data && data.objects) {
    matches = data.objects.map((match) => match.properties['enaio:objectId'].value);
  }

  if (!matches || !matches.length) {
  }
  */
};

gun.get('users').map().get('searchString').on(debounce(searchHandler, 1000, { 'maxWait': 2000 }));

// const getSearchHandler = (userId) => {
//   debounce(searchHandler, 1000, { 'maxWait': 2000 })
// }
// const users = gun.get('users')
// users.map().once((user, id) => {
//   users.get(id).get('searchString').on(getSearchHandler(id))
// });

// const queryResponseHandler = (data, userId) => {
//   // const results = data.do_stuff_here();

//   results.forEach((each) => {
//     gun.get(userId).get('searchResults').set(each);
//   });
// };
