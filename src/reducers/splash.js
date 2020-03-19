import { createReducer } from 'reduxsauce';
import produce from 'immer';

import { SET_TIP } from '../actions/splash';

const INITIAL_STATE = {
  data: {
    id: '',
    text: ''
  },
  status: {}
};

const setTip = produce(({ data }, { id, text }) => {
  data.id = id;
  data.text = text;
});

const reducer = createReducer(INITIAL_STATE, {
  [SET_TIP]: setTip
});

export { INITIAL_STATE };
export default reducer;
