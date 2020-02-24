import { combineReducers } from 'redux';

import nav from './nav';
import discover from './discover';
import global from './global';
import home from './home';

const rootReducer = combineReducers({ nav, global, discover, home });

export default rootReducer;
