import { createLogic } from 'redux-logic';
import { gun } from '../store';
import { omit } from 'lodash';
import { userDataLoaded, threadsLoaded, emailChanged } from '../actions';
import actionTypes from '../actions/types';

const userId = process.env.REACT_APP_USER_ID;

export const onStartup = createLogic({

	type: [actionTypes.APP_STARTED],

	async process(_, dispatch, done) {

		gun.get(userId).get('searchString').once((value) => {
			dispatch(userDataLoaded({ searchString: value }));
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

		await gun.get(userId).get('searchString').put(searchString);

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
