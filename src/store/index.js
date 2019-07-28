import Gun from 'gun';
import 'gun/lib/open.js';
import 'gun/lib/load.js';
import 'gun/lib/then.js';

const userId = process.env.REACT_APP_USER_ID;

export const gun = new Gun(['http://localhost:7700/gun']);
window.gun = gun;

export const emailRecords = gun.get(userId).get('threads').map();
export const searchStringRecord = gun.get(userId).get('searchString');
