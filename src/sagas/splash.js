import { all, call, fork, putResolve, takeLeading } from 'redux-saga/effects';

import { nardaApi } from '../services';
import { SNACKBAR_VARIANTS } from '../config/constants';
import { NOT_FOUND_MSG } from '../config/messages';
import { openNotification } from '../actions/global';
import { FETCH_TIP } from '../actions/splash';

import { showError } from './utils/error';

const { tips: tipsApi } = nardaApi;
const { WARNING } = SNACKBAR_VARIANTS;

function* fetchTip() {
  try {
    const { ok, data, status, problem } = yield call(tipsApi.getTips);

    if ((!ok || !data) && status !== 404) {
      throw new Error(problem);
    }

    if (status === 404) {
      yield putResolve(openNotification(WARNING, NOT_FOUND_MSG));

      return;
    }
  } catch (err) {
    yield call(showError, err);
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
