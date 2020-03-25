import { all, call, fork, putResolve, takeLeading } from 'redux-saga/effects';

import { nardaApi, TIMEOUTS } from '../services';
import { WELCOME_MSG } from '../config/messages';
import { FETCH_TIP, setTip } from '../actions/splash';

const { tips: tipsApi } = nardaApi;

function* fetchTip() {
  try {
    const config = { timeout: TIMEOUTS.FAST };
    const { data } = yield call(tipsApi.getTip, config);
    const { id, text } = data || {};

    yield putResolve(setTip(id, text || WELCOME_MSG));
  } catch (err) {
    yield;
  }
}

function* watcher() {
  // eslint-disable-next-line no-useless-catch
  try {
    yield all([takeLeading(FETCH_TIP, fetchTip)]);
  } catch (err) {
    throw err;
  }
}

export default [fork(watcher)];
