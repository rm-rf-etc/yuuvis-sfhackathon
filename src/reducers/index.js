import initialState from '../store/initialState';

export default (state = initialState, action = {}) => {

  switch (action.type) {
    default: return initialState;
  }
}
