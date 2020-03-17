import { createReducer } from 'reduxsauce';
import produce from 'immer';

import { FETCH_TIP } from '../actions/splash';

const INITIAL_STATE = {
  data: {
    text: ''
  },
  status: {
    fetching: false
  }
};

const setTip = produce(({ data }, { data: text }) => {
  data.text = text;
});

const reducer = createReducer(INITIAL_STATE, {
  [FETCH_TIP]: setTip
});

export { INITIAL_STATE };
export default reducer;
