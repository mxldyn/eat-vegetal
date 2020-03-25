import { NavigationActions, StackActions } from 'react-navigation';
import { all, fork, put, select, takeEvery } from 'redux-saga/effects';

import { locationChange } from '../actions/global';
import { makeGetCurrentRouteName } from '../selectors/nav';

const { BACK, NAVIGATE } = NavigationActions;
const { POP, POP_TO_TOP, PUSH, REPLACE, RESET } = StackActions;

let lastRouteName = '';

function* checkLocationChange({ type, routeName }) {
  try {
    if (
      [BACK, POP, POP_TO_TOP, RESET].includes(type) ||
      lastRouteName !== routeName
    ) {
      yield put(locationChange());
    }

    lastRouteName = yield select(makeGetCurrentRouteName());
  } catch (err) {
    yield;
  }
}

function* watcher() {
  // eslint-disable-next-line no-useless-catch
  try {
    yield all([
      takeEvery(
        [BACK, NAVIGATE, POP, POP_TO_TOP, PUSH, REPLACE, RESET],
        checkLocationChange
      )
    ]);
  } catch (err) {
    throw err;
  }
}

export default [fork(watcher)];
