import { createLogic } from 'redux-logic';
import Gun from 'gun';
import 'gun/lib/path.js';
import 'gun/lib/open.js';
import 'gun/lib/load.js';
import 'gun/lib/then.js';
import { omit } from 'lodash';
import actionTypes from '../actions/types';

const gun = new Gun(['http://localhost:7700/gun']);

export const onStartup = createLogic({

	type: [actionTypes.APP_STARTED],

	async process(_, dispatch, done) {

		const rawData = await gun.get('clients').load().then();
		const clientsList = Object.keys(omit(rawData, '_'));

		if (!clientsList) {
			console.log('No data found');
			return done();
		}
		console.log('the data', clientsList);
		dispatch({
			type: actionTypes.DATA_LOADED,
			payload: clientsList,
		});
		return done();
	}
});

export const rootLogic = createLogic({

	type: [actionTypes.ALL],

	process({ getState, action }, dispatch, done) {

		console.log('Action received:', action);
		console.log('Current state:', JSON.stringify(getState(), null, '  '));

	return done();
	}
});
