import { createLogic } from 'redux-logic';

export const rootLogic = createLogic({

  type: '*',

  process({ getState, action }, dispatch, done) {

    return done();
  }
});
