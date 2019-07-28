import { createStore, applyMiddleware, compose } from 'redux';
import Gun from 'gun';
import 'gun/lib/open.js';
import 'gun/lib/load.js';
import 'gun/lib/then.js';
import initialState from './initialState';
import rootReducer from '../reducers';
import * as logic from '../logic';
import { createLogicMiddleware } from 'redux-logic';

const userId = process.env.REACT_APP_USER_ID;

export const gun = new Gun(['http://localhost:7700/gun']);
window.gun = gun;

export const emailRecords = gun.get(userId).get('threads').map();
export const searchStringRecord = gun.get(userId).get('searchString');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = createLogicMiddleware(Object.values(logic));

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(middleware)));

export const getStore = () => store;
