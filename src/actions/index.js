import actionTypes from './types';

export const setSearch = (payload) => ({
	type: actionTypes.SET_SEARCH,
	payload,
});

export const threadsLoaded = (payload) => ({
	type: actionTypes.THREAD_DATA_LOADED,
	payload,
});

export const userDataLoaded = (payload) => ({
	type: actionTypes.USER_DATA_LOADED,
	payload,
});
