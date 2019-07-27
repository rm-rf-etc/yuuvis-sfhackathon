import initialState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import * as logic from '../logic';
import { createLogicMiddleware } from 'redux-logic';

const middleware = createLogicMiddleware(Object.values(logic));

const store = createStore(rootReducer, initialState, applyMiddleware(middleware));

export const getStore = () => store;
