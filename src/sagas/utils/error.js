import { NETWORK_ERROR } from 'apisauce';
import { put } from 'redux-saga/effects';

import { openAlert, openNotification } from '../../actions/global';
import { SNACKBAR_VARIANTS } from '../../config/constants';
import { INFO_MSG, ERROR_MSG, NO_INTERNET_MSG } from '../../config/messages';
import theme from '../../theme';

const { colors } = theme;
const { ERROR } = SNACKBAR_VARIANTS;

function* showError(error, onlyNet = false) {
  try {
    if (onlyNet && error.message !== NETWORK_ERROR) {
      return;
    }

    if (error.message === NETWORK_ERROR) {
      yield put(
        openAlert(INFO_MSG, NO_INTERNET_MSG, [], true, true, {
          type: 'MaterialCommunityIcons',
          name: 'information-outline',
          color: colors.primary
        })
      );
    } else {
      yield put(openNotification(ERROR, ERROR_MSG));
    }
  } catch (err) {
    yield put(openNotification(ERROR, ERROR_MSG));
  }
}

export { showError };
