import { all } from 'redux-saga/effects';

import example from './example';

function* root() {
  // eslint-disable-next-line no-useless-catch
  try {
    yield all([...example]);
  } catch (err) {
    throw err;
  }
}

export default root;
