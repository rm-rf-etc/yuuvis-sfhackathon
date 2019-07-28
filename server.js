const server = require('http').createServer();
const path = require('path');
const Gun = require('gun');
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
    subject: 'Gary\'s OTC trading',
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
    subject: 'Gary\'s OTC trading',
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
    subject: 'Please approve my vacation request',
    body: `EMAIL 4 Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.`,
  },
  'email/5': {
    highlighted: false,
    from: 'user/1',
    to: 'user/2',
    subject: 'Please approve my vacation request',
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


const searchHandler = (value) => {
  console.log(value);
};

gun.get('users').map().get('searchString').on(debounce(searchHandler, 500, { 'maxWait': 1000 }));

const queryResponseHandler = (data, userId) => {
  // const results = data.do_stuff_here();

  results.forEach((each) => {
    gun.get(userId).get('searchResults').set(each);
  });
};

var textapi = new AYLIENTextAPI({
  application_id: "8e9d825d",
  application_key: "d515b564aa74cd8ccfeb10ffb2e8a99c",
});

async function summarize(email) {
  let summaries = email;
  textapi.summarize({
    'text': email,
    'title': 'placeholder'
  },
  function(error, response) {
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

