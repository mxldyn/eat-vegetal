import { createSelector } from 'reselect';

import { getCurrentRouteName } from '../navigation/utils';

const getState = ({ nav }) => nav;

const makeGetNav = () => createSelector(getState, state => state);

const makeGetCurrentRouteName = () =>
  createSelector(getState, state => getCurrentRouteName(state));

export { makeGetNav, makeGetCurrentRouteName };
