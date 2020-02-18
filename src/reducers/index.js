import { combineReducers } from 'redux';

import nav from './nav';
import discover from './discover';
import global from './global';

const rootReducer = combineReducers({ nav, discover, global });

export default rootReducer;
