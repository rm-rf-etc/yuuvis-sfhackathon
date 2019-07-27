import initialState from './initialState';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import * as logic from '../logic';
import { createLogicMiddleware } from 'redux-logic';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = createLogicMiddleware(Object.values(logic));

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(middleware)));

export const getStore = () => store;
