import { createSelector } from 'reselect';

const getState = ({ nav }) => nav;

const makeGetNav = () => createSelector(getState, state => state);

export { makeGetNav };
