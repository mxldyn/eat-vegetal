import { NavigationActions } from 'react-navigation';
import produce from 'immer';

import { RootNavigator } from '../navigation';

const { INIT } = NavigationActions;
const {
  router: { getStateForAction }
} = RootNavigator;

const INITIAL_STATE = getStateForAction({ type: INIT });

const reducer = produce(
  (draft = INITIAL_STATE, action) => getStateForAction(action, draft) || draft
);

export default reducer;
