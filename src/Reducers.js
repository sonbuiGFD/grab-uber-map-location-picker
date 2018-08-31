import { combineReducers } from 'redux';

const initialState = {};

const global = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  global,
});
