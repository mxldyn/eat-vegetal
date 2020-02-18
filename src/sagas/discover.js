import {
  all,
  call,
  fork,
  put,
  putResolve,
  takeLeading
} from 'redux-saga/effects';
import uuidv4 from 'uuid/v4';

import { openNotification, stopSpinner } from '../actions/global';
import { UPLOAD_IMAGE } from '../actions/discover';
import { nardaApi } from '../services';
import { SNACKBAR_VARIANTS } from '../config/constants';
import { SUCCESS_MSG, ERROR_MSG } from '../config/messages';

const { images: imagesApi } = nardaApi;
const { SUCCESS, ERROR } = SNACKBAR_VARIANTS;

function* uploadImage({ uri }) {
  try {
    const data = new FormData();

    data.append('image', {
      uri,
      type: 'image/jpg',
      name: `${uuidv4()}.jpg`
    });
    const { ok, problem } = yield call(imagesApi.upload, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (!ok) {
      throw new Error(problem);
    }

    yield putResolve(openNotification(SUCCESS, SUCCESS_MSG));
  } catch (err) {
    yield put(openNotification(ERROR, ERROR_MSG));
  } finally {
    yield put(stopSpinner());
  }
}

function* watcher() {
  // eslint-disable-next-line no-useless-catch
  try {
    yield all([takeLeading(UPLOAD_IMAGE, uploadImage)]);
  } catch (err) {
    throw err;
  }
}

export default [fork(watcher)];
