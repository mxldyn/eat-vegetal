import { combineReducers } from 'redux';

import nav from './nav';
import global from './global';
import splash from './splash';
import home from './home';
import discover from './discover';

const rootReducer = combineReducers({
  nav,
  global,
  splash,
  home,
  discover
});

export default rootReducer;
