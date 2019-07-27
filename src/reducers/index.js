import initialState from '../store/initialState';
import actionTypes from '../actions/types';

export default (state = initialState, action = {}) => {

  switch (action.type) {
  	case actionTypes.SET_SEARCH: {
  		return {
  			...state,
  			searchString: action.payload.searchString,
  		}
  	}
    default: return initialState;
  }
}
