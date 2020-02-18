import { createReducer } from 'reduxsauce';
import produce from 'immer';

import { SET_STATUS } from '../actions/discover';

const INITIAL_STATE = {
  data: {},
  status: {}
};

const setStatus = produce(({ status }, { key, value }) => {
  status[key] = value;
});

const reducer = createReducer(INITIAL_STATE, {
  [SET_STATUS]: setStatus
});

export { INITIAL_STATE };
export default reducer;
