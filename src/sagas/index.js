import { all } from 'redux-saga/effects';

import discover from './discover';

function* root() {
  // eslint-disable-next-line no-useless-catch
  try {
    yield all([...discover]);
  } catch (err) {
    throw err;
  }
}

export default root;
