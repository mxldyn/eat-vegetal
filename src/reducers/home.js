import { createReducer } from 'reduxsauce';
import produce from 'immer';

import {
  CLEAR_VEGETAL,
  MERGE_VEGETABLES,
  SET_VEGETAL,
  SET_STATUS
} from '../actions/home';
import { INITIAL_PAGE } from '../config/constants';

import { mergeList } from './utils/data';

const INITIAL_STATE = {
  data: {
    vegetal: {
      id: '',
      name: '',
      iconImage: null,
      pages: []
    },
    vegetables: {
      data: [],
      page: INITIAL_PAGE
    }
  },
  status: {
    refreshing: false,
    fetching: false,
    refreshingId: '',
    fetchingId: ''
  }
};

const clearVegetal = produce(({ data }) => {
  data.vegetal = INITIAL_STATE.data.vegetal;
});

const mergeVegetables = produce(
  ({ data: { vegetables } }, { data, page, refresh }) => {
    vegetables.data = refresh ? data : mergeList(vegetables.data, data);
    vegetables.page = page;
  }
);

const setVegetal = produce(({ data }, { data: vegetal }) => {
  data.vegetal = vegetal;
});

const setStatus = produce(({ status }, { key, value }) => {
  status[key] = value;
});

const reducer = createReducer(INITIAL_STATE, {
  [CLEAR_VEGETAL]: clearVegetal,
  [MERGE_VEGETABLES]: mergeVegetables,
  [SET_VEGETAL]: setVegetal,
  [SET_STATUS]: setStatus
});

export { INITIAL_STATE };
export default reducer;
