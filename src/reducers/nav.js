import { NavigationActions, StackActions } from 'react-navigation';
import produce from 'immer';

import { RootNavigator } from '../navigation';
import { getCurrentRouteName } from '../navigation/utils';

const { INIT, NAVIGATE } = NavigationActions;
const { PUSH, REPLACE } = StackActions;
const {
  router: { getStateForAction }
} = RootNavigator;

const INITIAL_STATE = getStateForAction({ type: INIT });

const reducer = produce((draft = INITIAL_STATE, action) => {
  const { type, routeName } = action || {};

  return [NAVIGATE, PUSH, REPLACE].includes(type) &&
    routeName === getCurrentRouteName(draft)
    ? draft
    : getStateForAction(action, draft) || draft;
});

export default reducer;
