import { createLogic } from 'redux-logic';
import Gun from 'gun';
import 'gun/lib/path.js';
import 'gun/lib/open.js';
import 'gun/lib/load.js';
import 'gun/lib/then.js';
import { omit } from 'lodash';
import actionTypes from '../actions/types';

const gun = new Gun(['http://localhost:7700/gun']);
window.gun = gun;

export const onStartup = createLogic({

	type: [actionTypes.APP_STARTED],

	async process(_, dispatch, done) {

		const rawData = await gun.path('user/1.threads').load().then();
		const threadsList = Object.keys(omit(rawData, '_'));

		if (!threadsList) {
			console.log('No data found');
			return done();
		}

		console.log('THREADS FOUND:', threadsList);
		dispatch({
			type: actionTypes.DATA_LOADED,
			payload: threadsList,
		});

		return done();
	}
});

export const searchStateLogic = createLogic({

	type: [actionTypes.SET_SEARCH],

	async process({ action }, _, done) {

		const { searchString } = action.payload;

		await gun.path('user/1.searchString').put(searchString);

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
