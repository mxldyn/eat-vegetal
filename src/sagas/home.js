import { NavigationActions, StackActions } from 'react-navigation';
import {
  all,
  call,
  cancel,
  fork,
  put,
  putResolve,
  race,
  take,
  takeLeading,
  takeLatest
} from 'redux-saga/effects';

import { openNotification } from '../actions/global';
import {
  clearVegetal,
  mergeVegetables,
  setVegetal,
  setStatus,
  FETCH_VEGETAL,
  FETCH_VEGETABLES
} from '../actions/home';
import { isArray } from '../utils/is';
import { CancelToken, nardaApi } from '../services';
import { SNACKBAR_VARIANTS, RESULTS_LIMIT } from '../config/constants';
import { NOT_FOUND_MSG } from '../config/messages';
import { STORY_SCREEN } from '../navigation/screens';

import { showError } from './utils/error';
import { mapVegetables } from './utils/home';

const { vegetables: vegetablesApi } = nardaApi;
const { NAVIGATE, BACK, navigate } = NavigationActions;
const { REPLACE, PUSH } = StackActions;
const { WARNING } = SNACKBAR_VARIANTS;

const cancelConfig = { cancelToken: null };

function* fetchVegetal({ id, refresh }) {
  const statusKey = refresh ? 'refreshingId' : 'fetchingId';

  try {
    yield putResolve(setStatus(statusKey, id));

    if (!refresh) {
      yield all([
        putResolve(navigate({ routeName: STORY_SCREEN, params: { id } })),
        putResolve(clearVegetal())
      ]);
    }

    const { ok, data, status, problem } = yield call(
      vegetablesApi.getVegetal,
      id
    );

    if ((!ok || !data) && status !== 404) {
      throw new Error(problem);
    }

    if (status === 404) {
      yield putResolve(openNotification(WARNING, NOT_FOUND_MSG));

      return;
    }

    yield putResolve(setVegetal(data));
  } catch (err) {
    yield call(showError, err);
  } finally {
    yield put(setStatus(statusKey, ''));
  }
}

function* fetchVegetables({ page, refresh }) {
  const statusKey = refresh ? 'refreshing' : 'fetching';

  try {
    yield putResolve(setStatus(statusKey, true));

    const params = { page, limit: RESULTS_LIMIT };
    const { ok, data, problem } = yield call(
      vegetablesApi.getVegetables,
      params,
      cancelConfig
    );
    const { vegetables } = data || {};

    if (!ok || !isArray(vegetables)) {
      if (refresh) {
        yield call(showError, { message: problem }, true);
      }

      return;
    }

    yield putResolve(mergeVegetables(mapVegetables(vegetables), page, refresh));
  } catch (err) {
    yield call(showError, err);
  } finally {
    yield put(setStatus(statusKey, false));
  }
}

function* watcher() {
  // eslint-disable-next-line no-useless-catch
  try {
    yield all([takeLeading(FETCH_VEGETAL, fetchVegetal)]);
  } catch (err) {
    throw err;
  }
}

function* watcherCancel() {
  // eslint-disable-next-line no-useless-catch
  try {
    while (true) {
      const tasks = yield all([takeLatest(FETCH_VEGETABLES, fetchVegetables)]);
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

export default [fork(watcher), fork(watcherCancel)];
