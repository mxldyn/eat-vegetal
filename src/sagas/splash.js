import { NavigationActions, StackActions } from 'react-navigation';
import {
  all,
  call,
  cancel,
  fork,
  putResolve,
  race,
  take,
  takeLeading,
  takeLatest
} from 'redux-saga/effects';

import { CancelToken, nardaApi } from '../services';
import { SNACKBAR_VARIANTS } from '../config/constants';
import { NOT_FOUND_MSG } from '../config/messages';
import { openNotification } from '../actions/global';
import { FETCH_TIP, setTip } from '../actions/splash';

import { showError } from './utils/error';

const { tips: tipsApi } = nardaApi;
const { WARNING } = SNACKBAR_VARIANTS;
const { NAVIGATE, BACK } = NavigationActions;
const { REPLACE, PUSH } = StackActions;
const cancelConfig = { cancelToken: null };

function* fetchTip() {
  try {
    const { ok, data, status, problem } = yield call(tipsApi.getTip);

    if ((!ok || !data) && status !== 404) {
      throw new Error(problem);
    }

    if (status === 404) {
      yield putResolve(openNotification(WARNING, NOT_FOUND_MSG));

      return;
    }

    yield putResolve(setTip(data.id, data.text));
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

function* watcherCancel() {
  // eslint-disable-next-line no-useless-catch
  try {
    while (true) {
      const tasks = yield all([takeLatest(FETCH_TIP, fetchTip)]);
      const { cancel: apiCancel, token: cancelToken } = CancelToken.source();

      cancelConfig.cancelToken = cancelToken;

      yield race([take(NAVIGATE), take(BACK), take(REPLACE), take(PUSH)]);
      yield cancel(tasks);
      yield call(apiCancel);
    }
  } catch (err) {
    throw err;
  }
}

export default [fork(watcher), fork[watcherCancel]];
