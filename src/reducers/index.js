import { combineReducers } from 'redux';

import splash from './splash';
import nav from './nav';
import discover from './discover';
import global from './global';
import home from './home';

const rootReducer = combineReducers({ splash, nav, global, discover, home });

export default rootReducer;
