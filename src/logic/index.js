import { createLogic } from 'redux-logic';
import Gun from 'gun';
import 'gun/lib/open.js';
import 'gun/lib/load.js';
import 'gun/lib/then.js';
import { omit } from 'lodash';
import { userDataLoaded, threadsLoaded } from '../actions';
import actionTypes from '../actions/types';

const userId = process.env.REACT_APP_USER_ID;

const gun = new Gun(['http://localhost:7700/gun']);
window.gun = gun;

export const onStartup = createLogic({

	type: [actionTypes.APP_STARTED],

	async process(_, dispatch, done) {

		gun.get(userId).get('searchString').once((value) => {
			dispatch(userDataLoaded({ searchString: value }));
		});
		gun.get(userId).get('threads').once((value) => {
			console.log(`Thread ID's`);
			console.log(value);
			// dispatch(userDataLoaded({ threads: value }));
		});

		const rawThreads = await gun.get(userId).get('threads').load().then();
		const threadsList = Object.keys(omit(rawThreads, '_'));

		if (!threadsList) {
			console.error('No data found');
			return done();
		}

		dispatch(threadsLoaded(threadsList));

		return done();
	}
});

export const searchStateLogic = createLogic({

	type: [actionTypes.SET_SEARCH],

	async process({ action }, _, done) {

		const { searchString } = action.payload;

		await gun.get('user/1').get('searchString').put(searchString);

		return done();
	}
});

// export const rootLogic = createLogic({

// 	type: [actionTypes.ALL],

// 	process({ getState, action }, dispatch, done) {

// 		console.log('Action received:', action);
// 		console.log('Current state:', JSON.stringify(getState(), null, '  '));

// 		return done();
// 	}
// });
