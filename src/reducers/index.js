import { combineReducers } from 'redux';

import nav from './nav';
import example from './example';

const rootReducer = combineReducers({ nav, example });

export default rootReducer;
