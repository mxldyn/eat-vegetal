import { all } from 'redux-saga/effects';

import splash from './splash';
import discover from './discover';
import home from './home';

function* root() {
  // eslint-disable-next-line no-useless-catch
  try {
    yield all([...discover, ...home, ...splash]);
  } catch (err) {
    throw err;
  }
}

export default root;
