import { createLogic } from 'redux-logic';

export const rootLogic = createLogic({

  type: ['*'],

  process({ getState, action }, dispatch, done) {

  	console.log('Action received:', action);
  	console.log('Current state:', JSON.stringify(getState(), null, '  '));

    return done();
  }
});
