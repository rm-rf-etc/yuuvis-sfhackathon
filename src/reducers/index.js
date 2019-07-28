import initialState from '../store/initialState';
import actionTypes from '../actions/types';

export default (state = initialState, action = {}) => {

  switch (action.type) {
  	case actionTypes.EMAIL_DATA_LOADED: {
  		return state;
  	}
  	case actionTypes.USER_DATA_LOADED: {
  		return {
  			...state,
  			statusSearchActive: false,
  			searchString: action.payload.searchString,
  		};
  	}
  	case actionTypes.SET_SEARCH: {
  		return {
  			...state,
  			statusSearchActive: true,
  			searchString: action.payload.searchString,
  		};
  	}
    default: return state;
  }
}
